import { Router } from 'express';
import { CameraController } from '../controllers/cameraController';

export const cameraRoutes = (cameraController: CameraController): Router => {
    const router = Router();

    router.post('/cameras', cameraController.createCamera);
    router.get('/cameras', cameraController.getAllCameras);
    router.get('/cameras/:id', cameraController.getCameraById);
    router.patch('/cameras/:id', cameraController.updateCamera);
    router.delete('/cameras/:id', cameraController.deleteCamera);

    return router;
}