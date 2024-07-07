import express, {Express, Request, Response,  NextFunction} from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import {mediacontentRoutes} from './routes/mediacontentRoutes';
import {handleError} from './utils/errorHandler';

// В app.ts переменные окружения могут быть найдены автоматически
// - если ваш app.ts находится в каталоге, откуда запускается Node.js, dotenv сможет найти файл .env без указания явного пути.
dotenv.config();
//console.log(process.env);

const app: Express = express();

// Middleware для обработки тела запроса
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Маршрутизация
app.use('/api/mediacontent', mediacontentRoutes);

// Обработка ошибок
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    handleError(res, err);
});

// Маршрут по умолчанию
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the API');
});


// Запуск сервера
const PORT = process.env.EXPRESS_PORT || 5000;
app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
