import cron from 'node-cron';
import  FmpService  from './fmp.service';
import CommoditieRepository from '../Repositories/CommoditieRepository';
import Commoditie from '../entities/Commoditie';
import { Logger } from '../../utils/logger';

export class CommoditieSchedulerService {
    private readonly CommoditieSymbols: string[];
    private readonly cronExpression: string;
    private readonly fmpService: FmpService;
    private readonly commoditieRepository: CommoditieRepository;
    private readonly logger = new Logger('CommoditieSchedulerService');

    constructor(
        commoditieRepository: CommoditieRepository,
        fmpService: FmpService,
        CommoditieSymbols: string[] = ['KCUSX'], // Default to Coffee
        cronExpression: string = '0 18 * * 1-5' // Default: Run at 6:00 PM every weekday
    ) {
        this.commoditieRepository = commoditieRepository;
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
        this.logger.info(`Updating prices for ${this.CommoditieSymbols.length} commodities`);

        for (const symbol of this.CommoditieSymbols) {
            try {
                // Fetch historical prices from the FMP API
                const data = await this.fmpService.getHistoricalPrices(symbol);

                if (!data || !data.historical || !data.historical.length) {
                    this.logger.error(`No historical data returned for ${symbol}`);
                    continue;
                }

                // Extract the latest price data
                const latestData = data.historical[0];

                // Check if the commodity already exists in the database
                const existingCommoditie = await this.commoditieRepository.getCommoditieById(symbol);

                // Create a Commoditie object with the latest data
                const commoditie = new Commoditie(
                    undefined, // Let the constructor generate the UUID
                    data.symbol || symbol, // Use the symbol name from the API if available
                    symbol, // Symbol
                    latestData.close, // Price
                    latestData.low || 0, // Day low
                    latestData.high || 0, // Day high
                    latestData.open || 0, // Open price
                    latestData.previousClose || 0 // Previous close
                );

                let result;

                if (existingCommoditie.success && existingCommoditie.commoditie) {
                    // Update the existing commodity
                    result = await this.commoditieRepository.updateCommoditie(symbol, commoditie);
                    this.logger.info(`Updated existing commodity ${symbol} with latest price: ${latestData.close}`);
                } else {
                    // Create a new commodity
                    result = await this.commoditieRepository.createCommoditie(commoditie);
                    this.logger.info(`Created new commodity ${symbol} with price: ${latestData.close}`);
                }

                if (!result.success) {
                    this.logger.error(`Failed to save commodity ${symbol}: ${result.message}`);
                }
            } catch (error) {
                this.logger.error(`Error updating commodity ${symbol}:`, error);
            }
        }
    }

    // Method to manually trigger an update (useful for testing)
    public async manualUpdate(): Promise<void> {
        this.logger.info('Manual commodity update triggered');
        await this.updateCommoditiePrices();
    }
}

