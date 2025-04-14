import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export default class Commoditie {
    @PrimaryColumn()
    id: string;

    @Column({ nullable: true })
    name: string;

    @Column()
    symbol: string;

    @Column({ nullable: true })
    price: string;

    @Column({ nullable: true })
    dayLow: string;

    @Column({ nullable: true })
    dayHigh: string;

    @Column({ nullable: true })
    openPrice: string;

    @Column({ nullable: true })
    previousClose: string;

    constructor(
        id: string = uuidv4(), // Generate a UUID by default
        name: string,
        symbol: string,
        price: string,
        dayLow: string,
        dayHigh: string,
        openPrice: string,
        previousClose: string
    ) {
        this.id = id;
        this.name = name;
        this.symbol = symbol;
        this.price = price;
        this.dayLow = dayLow;
        this.dayHigh = dayHigh;
        this.openPrice = openPrice;
        this.previousClose = previousClose;
    }
}