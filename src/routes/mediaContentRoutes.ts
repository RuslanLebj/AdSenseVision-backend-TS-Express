import { Router } from 'express';
import { MediaContentController } from '../controllers/mediaContentController';
import upload from '../middleware/uploadMiddleware';

export const mediaContentRoutes = (mediaContentController: MediaContentController): Router => {
    const router = Router();

    router.post('/media-content', upload.single('video'), mediaContentController.createMediaContent);
    router.get('/media-content', mediaContentController.getAllMediaContent);
    router.get('/media-content/:id', mediaContentController.getMediaContentById);
    router.patch('/media-content/:id', mediaContentController.updateMediaContent);
    router.delete('/media-content/:id', mediaContentController.deleteMediaContent);

    return router;
}