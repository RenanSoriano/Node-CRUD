import { DataSource } from "typeorm";
//import path from "path";


//importar dotenv pra configurar isso aqui com as variaveis de ambiente depois
//por enquanto hardcoded mesmo
//a parte de migrations abaixo serve pra discriminar as migrations que precisam ser carregadas 

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    synchronize: false,
    entities:[],
    //migrations: ["src/database/migrations/**/*.ts"],
    //migrationsTableName: "Acoes",
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    });