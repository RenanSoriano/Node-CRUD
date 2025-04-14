import cron from 'node-cron';
import { TRACKED_COMMODITIES, UPDATE_SCHEDULE } from '../config/commodities.config';
import CommoditieRepository from '../Repositories/CommoditieRepository';
import Commoditie from '../entities/Commoditie';
import { Logger } from '../../utils/logger';
import { v4 as uuidv4 } from 'uuid';


export class CommoditieSchedulerService {
    private logger = new Logger('CommoditieScheduler');
    private scheduledTask: cron.ScheduledTask | null = null;
    
    constructor(
        private commoditieRepository: CommoditieRepository,
        private trackedCommodities: string[] = TRACKED_COMMODITIES,
        private schedule: string = UPDATE_SCHEDULE
    ) {}

    public startScheduler(): void {
        this.logger.info(`Starting scheduler with schedule: ${this.schedule}`);
        this.scheduledTask = cron.schedule(this.schedule, () => {
            this.updateCommodities();
        });
    }

    public async manualUpdate(): Promise<void> {
        this.logger.info('Manual update triggered');
        return this.updateCommodities();
    }

    private async updateCommodities(): Promise<void> {
        this.logger.info(`Updating commodities: ${this.trackedCommodities.join(', ')}`);
        
        for (const symbol of this.trackedCommodities) {
            try {
                // Create a placeholder commodity with minimal data
                // The actual price data will be fetched by the repository method
                const commodity = new Commoditie(
                    uuidv4(),
                    symbol, // Using symbol as name initially
                    symbol,
                    '0',      // These values will be overwritten by API data
                    '0',
                    '0',
                    '0',
                    '0'
                );
                
                const result = await this.commoditieRepository.createCommoditie(symbol);
                
                if (result.success) {
                    this.logger.info(`Successfully updated commodity: ${symbol}`);
                } else {
                    this.logger.error(`Failed to update commodity: ${symbol}. ${result.message}`);
                }
            } catch (error) {
                this.logger.error(`Error updating commodity ${symbol}:`, error);
            }
        }
    }
    
    public stopScheduler(): void {
        if (this.scheduledTask) {
            this.scheduledTask.stop();
            this.logger.info('Scheduler stopped');
        }
    }
}

