import express, {Express, Request, Response, NextFunction} from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import {handleError} from './utils/errorHandler';
import upload from './middleware/uploadMiddleware';
import {mediaContentRoutes} from './routes/mediaContentRoutes';
import {cameraRoutes} from './routes/cameraRoutes';
import {screenRoutes} from './routes/screenRoutes';
import {broadcastStationRoutes} from "./routes/broadcastStationRoutes";
import {MediaContentService} from './services/mediaContentService';
import {CameraService} from './services/cameraService';
import {ScreenService} from './services/screenService';
import {BroadcastStationService} from './services/broadcastStationService';
import mediaContentRepository from './repositories/mediaContentRepository';
import cameraRepository from './repositories/cameraRepository';
import screenRepository from './repositories/screenRepository';
import broadcastStationRepository from './repositories/broadcastStationRepository';
import {MediaContentController} from './controllers/mediaContentController';
import {CameraController} from './controllers/cameraController';
import {ScreenController} from './controllers/screenController';
import {BroadcastStationController} from './controllers/broadcastStationController';

// В app.ts переменные окружения могут быть найдены автоматически
// - если ваш app.ts находится в каталоге, откуда запускается Node.js, dotenv сможет найти файл .env без указания явного пути.
dotenv.config();
//console.log(process.env);

const app: Express = express();

// Middleware для обработки тела запроса
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Статическая маршрутизация для файлов в директории 'uploads'
app.use('/uploads', express.static('uploads'));

// Mediacontent
const mediaContentService = new MediaContentService(mediaContentRepository);
const mediaContentController = new MediaContentController(mediaContentService);
app.use('/api', mediaContentRoutes(mediaContentController));

// Camera
const cameraService = new CameraService(cameraRepository);
const cameraController = new CameraController(cameraService);
app.use('/api', cameraRoutes(cameraController));

// Screen
const screenService = new ScreenService(screenRepository);
const screenController = new ScreenController(screenService);
app.use('/api', screenRoutes(screenController));

// Broadcast station
const broadcastStationService = new BroadcastStationService(broadcastStationRepository);
const broadcastStationController = new BroadcastStationController(broadcastStationService);
app.use('/api', broadcastStationRoutes(broadcastStationController));

// Маршрут по умолчанию
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the API!!!');
});

// Обработка ошибок
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    handleError(res, err);
});


// Запуск сервера
const PORT = process.env.EXPRESS_PORT || 5000;
app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
