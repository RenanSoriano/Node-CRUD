import StockRepository from "../Repositories/StockRepository";
import { Request, Response } from "express";
import  Stock  from "../entities/Stock";

//aqui acho que só preciso colocar o getStocks





export default class StockController {
    constructor(private stockRepository: StockRepository) {}
    public async getStocks(req: Request, res: Response): Promise<void> {
        try {
            const stocks = await this.stockRepository.getStocks();
            res.status(200).json(stocks);
        } catch (error) {
            res.status(500).json({ message: "Error fetching stocks" });
        }
    }
}