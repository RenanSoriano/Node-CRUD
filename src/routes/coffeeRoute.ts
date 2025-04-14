import express from "express";
import CommoditieRepository from "../Repositories/CommoditieRepository";
import Commoditie from "../entities/Commoditie"; 
import { AppDataSource } from "../config/dataSource";
import CommoditieController from "../controllers/commoditieController";

const commoditieRepository = new CommoditieRepository(AppDataSource.getRepository(Commoditie));
const commoditieController = new CommoditieController(commoditieRepository);

const router = express.Router();

router.get("/coffee", (req, res) => commoditieController.getCommodities(req, res));
router.post("/coffee", (req, res) => commoditieController.createCommoditie(req, res));

export default router;

