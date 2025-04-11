import { Repository } from "typeorm";
import Stock from "../entities/Stock";
import InterfaceStockRepository from "./Interfaces/InterfaceStockRepository";

export default class StockRepository implements InterfaceStockRepository {
    private stockRepository: Repository<Stock>;

    constructor(stockRepository: Repository<Stock>) {
        this.stockRepository = stockRepository;
    }

    
    // actually is necessary to implement getStockById and createStock.
    // Frontend will call the routes when populating the dashboard, pages
    // and when the system inserts new data in db. 

    // createStock will need to collect the data from the fmp api. So, you 
    // could implement the fmp.service method in this class, this approach
    // turns this file greater, but as this is a fundamental part of the method 
    // consider mantining it here.

    async getStocks(): Promise<Array<Stock>> {
     
        return await this.stockRepository.find();
    }
    
    async getStockById(id: string): Promise<{ success: boolean; message?: string; stock?: Stock }> {
        try {
            const stock = await this.stockRepository.findOne({
                where: {
                    id
                }
            });
            
            if (!stock) {
                return {
                    success: false,
                    message: "Stock not found" 
                };
            }
            
            return {
                success: true,
                stock
            };
        } catch (error) {
            return {
                success: false,
                message: `Error while fetching: ${error}`
            };
        }
    }
    
    async createStock(stock: Stock): Promise<{ success: boolean; message?: string }> {
        try {
            await this.stockRepository.save(stock);
            return { success: true }; 

        } catch (error) {
            return {
                success: false,
                message: `Could not insert data: ${error}`
            };
        }
    }
}