import CommoditieRepository from "../Repositories/CommoditieRepository";
import { Request, Response } from "express";








export default class StockController {
    constructor(private CommoditieRepository: CommoditieRepository) {}
    public async getCommodities(req: Request, res: Response): Promise<void> {
        try {
            const stocks = await this.CommoditieRepository.getCommodities();
            res.status(200).json(stocks);
        } catch (error) {
            res.status(500).json({ message: "Error fetching stocks" });
        }
    }

    public async createCommoditie(req: Request, res: Response){

}
}import StockRepository from "../Repositories/CommoditieRepository";
import { Request, Response } from "express";


export default class StockController {

    constructor(private stockRepository: StockRepository) {}

    public async getStocks(req: Request, res: Response): Promise<void> {
        
        const stocks = await this.stockRepository.getStocks();
        res.status(200).json(stocks);
    }
}