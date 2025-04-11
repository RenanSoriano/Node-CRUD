import { DataSource } from "typeorm";
import "reflect-metadata";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "cafeh",
    database: "node_crud",
    synchronize: true,
    entities:["src/entities/*.ts"],
});

