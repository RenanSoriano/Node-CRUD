import { AppDataSource } from "./config/dataSource";
import express from "express";

const app = express();

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    });

export default app;