import CommoditieRepository from "../Repositories/CommoditieRepository";
import { Request, Response } from "express";

export default class CommoditieController {
    constructor(private CommoditieRepository: CommoditieRepository) {}
    public async getCommodities(req: Request, res: Response): Promise<void> {
        
            const stocks = await this.CommoditieRepository.getCommodities();
            res.status(200).json(stocks);
        
    }

    public async createCommoditie(req: Request, res: Response){

}
}