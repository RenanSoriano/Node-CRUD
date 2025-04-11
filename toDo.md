- refatorar pra buscar o preço do café (falta atualizar o endpoint)
- configurar rotas pro front 
- router com o express  e testa com o postman ou insomnia


To better handle the API response, consider adding a helper method to transform API data to your entity format:
// Add to FmpService class
transformApiResponseToStockEntities(apiResponse: any): Stock[] {
    if (!apiResponse || !apiResponse.historical || !apiResponse.historical.length) {
        return [];
    }
    
    const { symbol } = apiResponse;
    const stocks: Stock[] = [];
    
    // Map each historical entry to a Stock entity
    for (const entry of apiResponse.historical) {
        const stock = new Stock(
            symbol,             // id
            symbol,             // name (can be enhanced with a separate company info API call)
            entry.close,        // price
            new Date(entry.date), // priceDate
            new Date()          // updatedDate
        );
        
        stocks.push(stock);
    }
    
    return stocks;
}

Recommended Entity Refactoring
import { Entity, Column, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export default class Stock {
    @PrimaryColumn()
    id: string; // The stock symbol (e.g., "AAPL")
    
    @Column()
    name: string; // Full company name
    
    @Column({ type: 'float' })
    price: number; // Current price (renamed from "valor" for clarity)
    
    @Column({ nullable: true })
    priceDate: Date; // The date of the price data from API
    
    @UpdateDateColumn()
    updatedDate: Date; // When the record was last updated in our database

    constructor(id: string, name: string, price: number, priceDate: Date, updatedDate: Date = new Date()) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.priceDate = priceDate;
        this.updatedDate = updatedDate;
    }
}