import {Request, Response} from 'express';
import {ScreenService} from '../services/screenService';
import {handleError} from '../utils/errorHandler';

export class ScreenController {
    constructor(private screenService: ScreenService) {}

    createScreen = async (req: Request, res: Response): Promise<void> => {
        try {
            const screen = await this.screenService.createScreen(req.body);
            res.status(201).json(screen);
        } catch (error) {
            handleError(res, error);
        }
    }

    getAllScreens = async (req: Request, res: Response): Promise<void> => {
        try {
            const screens = await this.screenService.getAllScreens();
            res.status(200).json(screens);
        } catch (error) {
            handleError(res, error);
        }
    }

    getScreenById = async (req: Request, res: Response): Promise<void> => {
        try {
            const screen = await this.screenService.getScreenById(req.params.id);
            if (!screen) {
                res.status(404).json({error: 'Screen not found'});
            } else {
                res.status(200).json(screen);
            }
        } catch (error) {
            handleError(res, error);
        }
    }

    updateScreen = async (req: Request, res: Response): Promise<void> => {
        try {
            const updateData = {
                name: req.body.name,
                start_time: req.body.start_time,
                end_time: req.body.end_time,
                pause_time: req.body.pause_time,
                update_date: req.body.update_date
            };
            const screen = await this.screenService.updateScreen(req.params.id, updateData);
            if (!screen) {
                res.status(404).json({error: 'Screen not found'});
            } else {
                res.status(200).json(screen);
            }
        } catch (error) {
            handleError(res, error);
        }
    }

    deleteScreen = async (req: Request, res: Response): Promise<void> => {
        try {
            const screen = await this.screenService.deleteScreen(req.params.id);
            if (!screen) {
                res.status(404).json({error: 'Screen not found'});
            } else {
                res.status(200).json(screen);
            }
        } catch (error) {
            handleError(res, error);
        }
    }
}