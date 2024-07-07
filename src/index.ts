import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

// В index.ts переменные окружения могут быть найдены автоматически
// - если ваш index.ts находится в каталоге, откуда запускается Node.js, dotenv сможет найти файл .env без указания явного пути.
dotenv.config();
//console.log(process.env);

const index: Express = express();
const port = process.env.EXPRESS_PORT;

index.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

index.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
