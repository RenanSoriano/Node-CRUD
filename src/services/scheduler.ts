import cron from 'node-cron';
import { FmpService } from './fmp.service';
import CommoditieRepository from '../Repositories/CommoditieRepository';
import Commoditie from '../entities/Commoditie';
import { Repository } from 'typeorm';
import { Logger } from '../../utils/logger';

export class CommoditieSchedulerService {
    private readonly CommoditieSymbols: string[];
    private readonly cronExpression: string;
    private readonly fmpService: FmpService;
    private readonly CommoditieRepository: CommoditieRepository;
    private readonly logger = new Logger('CommoditieSchedulerService');

    constructor(
        CommoditieRepository: CommoditieRepository,
        fmpService: FmpService,
        CommoditieSymbols: string[] = ['KCUSX'],
        // Default: Run at 18:00 (6:00 PM) every weekday - after US market close
        cronExpression: string = '0 18 * * 1-5'
    ) {
        this.CommoditieRepository = CommoditieRepository as CommoditieRepository;
        this.fmpService = fmpService;
        this.CommoditieSymbols = CommoditieSymbols;
        this.cronExpression = cronExpression;
    }

    public startScheduler(): void {
        this.logger.info('Commoditie update scheduler started');
        this.logger.info(`Scheduled to run at: ${this.cronExpression}`);
        
        // Schedule the job according to the cron expression
        cron.schedule(this.cronExpression, async () => {
            this.logger.info('Running scheduled Commoditie update job');
            await this.updateCommoditiePrices();
        });
    }

    public async updateCommoditiePrices(): Promise<void> {
        this.logger.info(`Updating prices for ${this.CommoditieSymbols.length} Commodities`);

        for (const symbol of this.CommoditieSymbols) {
            try {
                // Get historical prices from FMP API
                const data = await this.fmpService.getHistoricalPrices(symbol);
                
                if (!data || !data.historical || !data.historical.length) {
                    this.logger.error(`No historical data returned for ${symbol}`);
                    continue;
                }
                
                // Get the latest price data (first item in the array)
                const latestData = data.historical[0];
                
                // Check if the Commoditie already exists in the database
                const existingCommoditie = await this.CommoditieRepository.getCommoditieById(symbol);
                
                // Create a Commoditie object with the latest data
                const Commoditie = new Commoditie(
                    symbol,
                    data.symbol || symbol, // Use the symbol name from the API if available
                    latestData.close,
                    new Date()
                );
                
                let result;
                
                // Update or create based on whether the Commoditie exists
                if (existingCommoditie.success && existingCommoditie.Commoditie) {
                    // Commoditie exists, update it
                    result = await this.CommoditieRepository.updateCommoditie(symbol, Commoditie);
                    this.logger.info(`Updated existing Commoditie ${symbol} with latest price: ${latestData.close}`);
                } else {
                    // Commoditie doesn't exist, create it
                    result = await this.CommoditieRepository.createCommoditie(Commoditie);
                    this.logger.info(`Created new Commoditie ${symbol} with price: ${latestData.close}`);
                }
                
                if (!result.success) {
                    this.logger.error(`Failed to save Commoditie ${symbol}: ${result.message}`);
                }
            } catch (error) {
                this.logger.error(`Error updating Commoditie ${symbol}:`, error);
            }
        }
    }

    // Method to manually trigger an update (useful for testing)
    public async manualUpdate(): Promise<void> {
        this.logger.info('Manual Commoditie update triggered');
        await this.updateCommoditiePrices();
    }
}

