import Stock from "../../entities/Stock";


export default interface InterfaceStockRepository {
    create(name: string, valor: number): Promise<Stock>;
    //findById(id: string): Promise<Stock | null>;
    //findAll(): Promise<Stock[]>;
    update(id: string, name: string, valor: number): Promise<Stock | null>;
    delete(id: string): Promise<void>;
}