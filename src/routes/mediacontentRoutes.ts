import { Router } from 'express';
import { MediacontentController } from '../controllers/mediacontentController';

export const mediacontentRoutes = (mediacontentController: MediacontentController): Router => {
    const router = Router();

    router.post('/mediacontent', mediacontentController.createMediacontent);
    router.get('/mediacontent', mediacontentController.getAllMediacontent);
    router.get('/mediacontent/:id', mediacontentController.getMediacontentById);
    router.put('/mediacontent/:id', mediacontentController.updateMediacontent);
    router.delete('/mediacontent/:id', mediacontentController.deleteMediacontent);

    return router;
};