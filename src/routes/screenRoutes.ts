import { Router } from 'express';
import { ScreenController } from '../controllers/screenController';

export const screenRoutes = (screenController: ScreenController): Router => {
    const router = Router();

    router.post('/screens', screenController.createScreen);
    router.get('/screens', screenController.getAllScreens);
    router.get('/screens/:id', screenController.getScreenById);
    router.patch('/screens/:id', screenController.updateScreen);
    router.delete('/screens/:id', screenController.deleteScreen);

    return router;
}
