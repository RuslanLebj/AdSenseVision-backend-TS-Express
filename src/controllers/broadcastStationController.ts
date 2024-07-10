import {Request, Response} from 'express';
import {BroadcastStationService} from '../services/broadcastStationService';
import {handleError} from '../utils/errorHandler';

export class BroadcastStationController {
    constructor(private broadcastStationService: BroadcastStationService) {}

    createBroadcastStation = async (req: Request, res: Response): Promise<void> => {
        try {
            const broadcastStation = await this.broadcastStationService.createBroadcastStation(req.body);
            res.status(201).json(broadcastStation);
        } catch (error) {
            handleError(res, error);
        }
    }

    getAllBroadcastStations = async (req: Request, res: Response): Promise<void> => {
        try {
            const broadcastStations = await this.broadcastStationService.getAllBroadcastStations();
            res.status(200).json(broadcastStations);
        } catch (error) {
            handleError(res, error);
        }
    }

    getBroadcastStationById = async (req: Request, res: Response): Promise<void> => {
        try {
            const broadcastStation = await this.broadcastStationService.getBroadcastStationById(req.params.id);
            if (!broadcastStation) {
                res.status(404).json({error: 'Broadcast station not found'});
            } else {
                res.status(200).json(broadcastStation);
            }
        } catch (error) {
            handleError(res, error);
        }
    }

    updateBroadcastStation = async (req: Request, res: Response): Promise<void> => {
        try {
            const updateData = {
                name: req.body.name,
                camera_id: req.body.camera_id,
                screen_id: req.body.screen_id,
                location_address: req.body.location_address
            };
            const broadcastStation = await this.broadcastStationService.updateBroadcastStation(req.params.id, updateData);
            if (!broadcastStation) {
                res.status(404).json({error: 'Broadcast station not found'});
            } else {
                res.status(200).json(broadcastStation);
            }
        } catch (error) {
            handleError(res, error);
        }
    }

    deleteBroadcastStation = async (req: Request, res: Response): Promise<void> => {
        try {
            const broadcastStation = await this.broadcastStationService.deleteBroadcastStation(req.params.id);
            if (!broadcastStation) {
                res.status(404).json({error: 'Broadcast station not found'});
            } else {
                res.status(200).json(broadcastStation);
            }
        } catch (error) {
            handleError(res, error);
        }
    }
}