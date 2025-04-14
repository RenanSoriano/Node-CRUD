import CommoditieRepository from "../Repositories/CommoditieRepository";
import Commoditie from "../entities/Commoditie";
import { Request, Response } from "express";

export default class CommoditieController {
    constructor(private CommoditieRepository: CommoditieRepository) {}

    public async getCommodities(req: Request, res: Response): Promise<void> {
        const stocks = await this.CommoditieRepository.getCommodities();
        res.status(200).json(stocks);
    }

    public async createCommoditie(req: Request, res: Response): Promise<void> {
        
            const { symbol} = <{symbol:string}>req.body;
            // Save the new commodity using the repository
            const result = await this.CommoditieRepository.createCommoditie(symbol);

            const { success, message } = await this.CommoditieRepository.createCommoditie(symbol);
            if (!success) {
                res.status(500).json({message });
                return;
            }

            res.status(201).json({ message: "Commoditie created successfully." });
    }
}