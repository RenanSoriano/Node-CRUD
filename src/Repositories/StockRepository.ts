import { Repository } from "typeorm";
import Stock from "../entities/Stock";
import InterfaceStockRepository from "./Interfaces/InterfaceStockRepository";

export default class StockRepository implements InterfaceStockRepository {
    private stockRepository: Repository<Stock>;

    constructor(stockRepository: Repository<Stock>) {
        this.stockRepository = stockRepository;
    }

    // basicamente o único método que interage com o view
    // actually is necessary to implement getStockById and createStock.
    // Frontend will call the routes when populating the dashboard, pages
    // and when the system inserts new data in db. 

    // createStock will need to collect the data from the fmp api. So, you 
    // could implement the fmp.service method in this class, this approach
    // turns this file greater, but as this is a fundamental part of the method 
    // consider mantining it here.

    async getStocks(): Promise<Array<Stock>> {
        // prefer using Array while describing the type os response and variables. 
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
                    message: "Stock not found" // there's no need for inserting id on api response 
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
            return { success: true }; // when return is true, this method returns only a boolean value.

        } catch (error) {
            return {
                success: false,
                message: `Could not insert data: ${error}`
            };
        }
    }
}