import { DataSource } from "typeorm";
//importar dotenv pra configurar isso aqui com as variaveis de ambiente depois
//por enquanto hardcoded mesmo

export default new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    entities: [
        /*...*/
    ],
    migrations: [
        /*...*/
    ],
    migrationsTableName: "custom_migration_table",
})