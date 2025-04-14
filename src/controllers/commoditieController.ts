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
        try {
            const { name, symbol, price, dayLow, dayHigh, openPrice, previousClose } = req.body;

            // Validate required fields
            if (!name || !symbol || price === undefined) {
                res.status(400).json({ message: "Name, symbol, and price are required." });
                return;
            }

            // Create a new Commoditie entity
            const newCommoditie = new Commoditie(
                undefined, // Let the constructor generate the UUID
                name,
                symbol,
                price,
                dayLow || 0,
                dayHigh || 0,
                openPrice || 0,
                previousClose || 0
            );

            // Save the new commodity using the repository
            const result = await this.CommoditieRepository.createCommoditie(newCommoditie);

            if (!result.success) {
                res.status(500).json({ message: result.message });
                return;
            }

            res.status(201).json({ message: "Commoditie created successfully." });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            res.status(500).json({ message: "Error creating commoditie.", error: errorMessage });
        }
    }
}