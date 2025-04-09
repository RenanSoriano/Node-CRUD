import { Repository } from "typeorm";
import Stock from "../entities/Stock";
import InterfaceStockRepository from "./Interfaces/InterfaceStockRepository";



export default class StockRepository implements InterfaceStockRepository {
    private stockRepository: Repository<Stock>;

    constructor(stockRepository: Repository<Stock>) {
        this.stockRepository = stockRepository;
    }

    async getStocks(): Promise<Stock[]> {
        return await this.stockRepository.find();
    }

    async getStockById(id: string): Promise<{ success: boolean; message?: string; stock?: Stock }> {
        try {
            const stock = await this.stockRepository.findOneBy({ id });
            
            if (!stock) {
                return {
                    success: false,
                    message: `Stock with id ${id} not found`
                };
            }
            
            return {
                success: true,
                stock
            };
        } catch (error) {
            return {
                success: false,
                message: `Error fetching stock: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }

    async createStock(stock: Stock): Promise<{ success: boolean; message?: string }> {
        try {
            const result = await this.stockRepository.save(stock);
            return { 
                success: true,
                message: "Stock created successfully" 
            };
        } catch (error) {
            return {
                success: false,
                message: `Failed to create stock: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }

    async updateStock(id: string, stock: Stock): Promise<{ success: boolean; message?: string }> {
        try {
            await this.stockRepository.update(id, stock);
            return { 
                success: true,
                message: "Stock updated successfully" 
            };
        } catch (error) {
            return {
                success: false,
                message: `Failed to update stock: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }

    async deleteStock(id: string): Promise<{ success: boolean; message?: string }> {
        try {
            await this.stockRepository.delete(id);
            return { 
                success: true,
                message: "Stock deleted successfully" 
            };
        } catch (error) {
            return {
                success: false,
                message: `Failed to delete stock: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
}