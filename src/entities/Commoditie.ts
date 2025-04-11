<<<<<<< HEAD
import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export default class Commoditie {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    symbol: string;

    @Column()
    price: number;

    @Column()
    dayLow: number;

    @Column()
    dayHigh: number;

    @Column()
    openPrice: number;

    @Column()
    previousClose: number;

    constructor(
        id: string = uuidv4(), // Generate a UUID by default
        name: string,
        symbol: string,
        price: number,
        dayLow: number,
        dayHigh: number,
        openPrice: number,
        previousClose: number
    ) {
        this.id = id;
        this.name = name;
        this.symbol = symbol;
        this.price = price;
        this.dayLow = dayLow;
        this.dayHigh = dayHigh;
        this.openPrice = openPrice;
        this.previousClose = previousClose;
=======
import { Entity, Column, PrimaryColumn, UpdateDateColumn } from 'typeorm';


@Entity()
export default class Stock {
    @PrimaryColumn()
    id: string
    @Column()
    name: string;
    @Column()
    valor: number;
    @UpdateDateColumn()
    updatedDate: Date;


    constructor(
        id: string, 
        name: string,
        valor: number,
        updatedDate: Date
    ) {
        this.id = id;
        this.name = name;
        this.valor = valor;
        this.updatedDate = updatedDate;
>>>>>>> main
    }
}