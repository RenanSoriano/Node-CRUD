import { DataSource } from "typeorm";
//import path from "path";
import "reflect-metadata";

//importar dotenv pra configurar isso aqui com as variaveis de ambiente depois
//por enquanto hardcoded mesmo
//a parte de migrations abaixo serve pra discriminar as migrations que precisam ser carregadas 

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "cafeh",
    database: "node_crud",
    synchronize: true,
    entities:["src/entities/*.ts"],
    //migrations: ["src/database/migrations/**/*.ts"],
    //migrationsTableName: "Acoes",
});

