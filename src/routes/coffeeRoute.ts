import express from "express";
import CommoditieRepository from "../Repositories/CommoditieRepository";
import Commoditie from "../entities/Commoditie"; // Import the Commoditie entity
import { AppDataSource } from "../config/dataSource";
import CommoditieController from "../controllers/commoditieController";

const commoditieRepository = new CommoditieRepository(AppDataSource.getRepository(Commoditie));
const commoditieController = new CommoditieController(commoditieRepository);

const router = express.Router();

router.get("/", (req, res) => commoditieController.getCommodities(req, res));

export default router;

// Define the routes for commodities