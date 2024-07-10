import {Request, Response} from 'express';
import {CameraService} from '../services/cameraService';
import {handleError} from '../utils/errorHandler';

export class CameraController {
    constructor(private cameraService: CameraService) {}

    createCamera = async (req: Request, res: Response): Promise<void> => {
        try {
            const camera = await this.cameraService.createCamera(req.body);
            res.status(201).json(camera);
        } catch (error) {
            handleError(res, error);
        }
    }

    getAllCameras = async (req: Request, res: Response): Promise<void> => {
        try {
            const cameras = await this.cameraService.getAllCameras();
            res.status(200).json(cameras);
        } catch (error) {
            handleError(res, error);
        }
    }

    getCameraById = async (req: Request, res: Response): Promise<void> => {
        try {
            const camera = await this.cameraService.getCameraById(req.params.id);
            if (!camera) {
                res.status(404).json({error: 'Camera not found'});
            } else {
                res.status(200).json(camera);
            }
        } catch (error) {
            handleError(res, error);
        }
    }

    updateCamera = async (req: Request, res: Response): Promise<void> => {
        try {
            const updateData = {
                name: req.body.name,
                url_address: req.body.url_address,
                connection_login: req.body.connection_login,
                connection_password: req.body.connection_password
            };
            const camera = await this.cameraService.updateCamera(req.params.id, updateData);
            if (!camera) {
                res.status(404).json({error: 'Camera not found'});
            } else {
                res.status(200).json(camera);
            }
        } catch (error) {
            handleError(res, error);
        }
    }

    deleteCamera = async (req: Request, res: Response): Promise<void> => {
        try {
            const camera = await this.cameraService.deleteCamera(req.params.id);
            if (!camera) {
                res.status(404).json({error: 'Camera not found'});
            } else {
                res.status(200).json(camera);
            }
        } catch (error) {
            handleError(res, error);
        }
    }
}