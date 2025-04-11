import StockRepository from "../Repositories/StockRepository";
import { Request, Response } from "express";
// Avoid tons of break lines :)

export default class StockController {

    constructor(private stockRepository: StockRepository) {}

    public async getStocks(req: Request, res: Response): Promise<void> {
        // there is no need for inserting a trycatch block here.
        // If your method is correct implemented the get all method
        // will always work.

        const stocks = await this.stockRepository.getStocks();
        res.status(200).json(stocks);
    }
}