import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/dataSource";


const app = express();

app.listen(3000, () => console.log("Server is running on port 3000"));
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    });