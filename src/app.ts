import { AppDataSource } from "./config/dataSource";
import express from "express";
import { FmpService } from "./services/fmp.service";
import { StockSchedulerService } from "./services/scheduler";
import Stock from "./entities/Commoditie";
import { TRACKED_STOCKS, UPDATE_SCHEDULE } from "./config/commodities.config";


const app = express();

// Configure middleware
app.use(express.json());

// Initialize data source and services
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        
        // Initialize services
        const fmpService = new FmpService();
        
        // Get the repository from TypeORM
        const stockRepository = AppDataSource.getRepository(Stock);
        
        // Create and start the stock scheduler
        const stockScheduler = new StockSchedulerService(
            stockRepository,
            fmpService,
            TRACKED_STOCKS,
            UPDATE_SCHEDULE
        );
        
        // Start the scheduler
        stockScheduler.startScheduler();
        
        // Optional: Run an initial update when the app starts
        // stockScheduler.manualUpdate();
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });

export default app;