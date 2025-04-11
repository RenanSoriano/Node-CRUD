import StockRepository from "../Repositories/CommoditieRepository";
import { Request, Response } from "express";


export default class StockController {

    constructor(private stockRepository: StockRepository) {}

    public async getStocks(req: Request, res: Response): Promise<void> {
        
        const stocks = await this.stockRepository.getStocks();
        res.status(200).json(stocks);
    }
}