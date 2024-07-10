import { Router } from 'express';
import { BroadcastStationController } from '../controllers/broadcastStationController';

export const broadcastStationRoutes = (broadcastStationController: BroadcastStationController): Router => {
    const router = Router();

    router.post('/broadcast-stations', broadcastStationController.createBroadcastStation);
    router.get('/broadcast-stations', broadcastStationController.getAllBroadcastStations);
    router.get('/broadcast-stations/:id', broadcastStationController.getBroadcastStationById);
    router.patch('/broadcast-stations/:id', broadcastStationController.updateBroadcastStation);
    router.delete('/broadcast-stations/:id', broadcastStationController.deleteBroadcastStation);

    return router;
}