import { Entity, Column, PrimaryColumn} from 'typeorm';

@Entity()
export default class Stock {
    @PrimaryColumn()
    id: string
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
    //@CreateDateColumn()*/
    //createdDate: Date;
    //@UpdateDateColumn()
    //updatedDate: Date;


    constructor(id: string, name: string, symbol: string, price: number, dayLow: number, dayHigh: number, openPrice: number, previousClose: number) {
        this.id = id;
        this.name = name;
        this.symbol = symbol; 
        this.price = price;
        this.dayLow = dayLow;
        this.dayHigh = dayHigh;
        this.openPrice = openPrice;
        this.previousClose = previousClose;
        //this.createdDate = createdDate;
        //this.updatedDate = updatedDate;
    }
}