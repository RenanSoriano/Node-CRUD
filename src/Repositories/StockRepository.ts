import { Repository } from "typeorm";
import Stock from "../entities/Stock";
import InterfaceStockRepository from "./Interfaces/InterfaceStockRepository";


type StockRequest = {
    name: string;
    valor: number;
};

export class createStockService {
    async execute({name, valor}: Promise<StockRequest>){
        
    }
}