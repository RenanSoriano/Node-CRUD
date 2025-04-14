import express from "express";
import coffeeRoute from "./coffeeRoute";
import bodyParser from "body-parser";

const router = (app: express.Router) => {
    app.use(
        bodyParser.json(),
        coffeeRoute,
    )
}
export default router;