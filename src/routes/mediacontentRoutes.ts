import { Router } from 'express';
import { MediacontentController } from '../controllers/mediacontentController';
import upload from '../middleware/uploadMiddleware';

export const mediacontentRoutes = (mediacontentController: MediacontentController): Router => {
    const router = Router();

    router.post('/mediacontent', upload.single('video'), mediacontentController.createMediacontent);
    router.get('/mediacontent', mediacontentController.getAllMediacontent);
    router.get('/mediacontent/:id', mediacontentController.getMediacontentById);
    router.put('/mediacontent/:id', mediacontentController.updateMediacontent);
    router.delete('/mediacontent/:id', mediacontentController.deleteMediacontent);

    return router;
}