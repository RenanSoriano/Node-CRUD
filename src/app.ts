import { AppDataSource } from "./config/dataSource";
import express from "express";
import { CommoditieSchedulerService } from "./services/scheduler";
import Commoditie from "./entities/Commoditie";
import { TRACKED_COMMODITIES, UPDATE_SCHEDULE } from "./config/commodities.config";
import CommoditieRepository from "./Repositories/CommoditieRepository";
import router from "./routes";

const app = express();
app.use(express.json());
router(app);

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");

        
        const commoditieRepositoryInstance = AppDataSource.getRepository(Commoditie);
        const commoditieRepository = new CommoditieRepository(commoditieRepositoryInstance);

        const commoditieScheduler = new CommoditieSchedulerService(
            commoditieRepository,
            TRACKED_COMMODITIES,
            UPDATE_SCHEDULE
        );

        // Start the scheduler
        commoditieScheduler.startScheduler();

        //Run an initial update when the app starts
         //commoditieScheduler.manualUpdate();
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });

export default app;