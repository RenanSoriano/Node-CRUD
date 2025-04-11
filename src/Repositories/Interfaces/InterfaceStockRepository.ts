import Stock from "../../entities/Stock";


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