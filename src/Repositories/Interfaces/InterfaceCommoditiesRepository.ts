import Stock from "../../entities/Commoditie";


export default interface InterfaceStockRepository {
    getStocks(): Promise<Stock[]>;
    getStockById(id: string): Promise<{
        success: boolean;
        message?: string;
        stock?: Stock;
    }>;
    createStock(
        stock: Stock
    ): Promise<{
        success: boolean;
        message?: string;
    }>;

}