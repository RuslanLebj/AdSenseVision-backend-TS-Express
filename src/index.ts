import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const index: Express = express();
const port = process.env.PORT;

index.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

index.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
