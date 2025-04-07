import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';
@Entity()
export class Acoes {
    name: string;
    valor: number;
    data: Date;

    constructor(name: string, valor: number, data: Date) {
        this.name = name;
        this.valor = valor;
        this.data = data;
    }
}