import { AppDataSource } from "./config/dataSource";
import express from "express";
import { FmpService } from "./services/fmp.service";
import { CommoditieSchedulerService } from "./services/scheduler";
import Commoditie from "./entities/Commoditie";
import { TRACKED_COMMODITIES, UPDATE_SCHEDULE } from "./config/commodities.config";
import CommoditieRepository from "./Repositories/CommoditieRepository";

const app = express();

// Configure middleware
app.use(express.json());

// Initialize data source and services
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");

        // Initialize FMP service
        const fmpService = new FmpService();

        // Get the repository instance from TypeORM
        const commoditieRepositoryInstance = AppDataSource.getRepository(Commoditie);

        // Initialize the CommoditieRepository
        const commoditieRepository = new CommoditieRepository(commoditieRepositoryInstance);

        // Create and start the Commodities Scheduler
        const commoditieScheduler = new CommoditieSchedulerService(
            commoditieRepository,
            fmpService,
            TRACKED_COMMODITIES,
            UPDATE_SCHEDULE
        );

        // Start the scheduler
        commoditieScheduler.startScheduler();

        // Optional: Run an initial update when the app starts
        // commoditieScheduler.manualUpdate();
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });

export default app;