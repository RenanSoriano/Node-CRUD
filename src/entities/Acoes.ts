import { Entity, Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Acoes {
    @PrimaryColumn()
    id: string
    @Column()
    name: string;
    @Column()
    valor: number;
    @CreateDateColumn()
    createdDate: Date;
    @UpdateDateColumn()
    updatedDate: Date;


    constructor(id: string, name: string, valor: number, createdDate: Date, updatedDate: Date) {
        this.id = id;
        this.name = name;
        this.valor = valor;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }
}