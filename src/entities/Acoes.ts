import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

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