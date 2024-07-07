import { Request, Response } from 'express';
import { MediacontentService } from '../services/mediacontentService';
import { handleError } from '../utils/errorHandler';

export class MediacontentController {
    constructor(private mediacontentService: MediacontentService) {}

    createMediacontent = async (req: Request, res: Response): Promise<void> => {
        try {
            const mediacontent = await this.mediacontentService.createMediacontent(req.body);
            res.status(201).json(mediacontent);
        } catch (error) {
            handleError(res, error);
        }
    }

    getAllMediacontent = async (req: Request, res: Response): Promise<void> => {
        try {
            const mediacontent = await this.mediacontentService.getAllMediacontent();
            res.status(200).json(mediacontent);
        } catch (error) {
            handleError(res, error);
        }
    }

    getMediacontentById = async (req: Request, res: Response): Promise<void> => {
        try {
            const mediacontent = await this.mediacontentService.getMediacontentById(req.params.id);
            if (!mediacontent) {
                res.status(404).json({ error: 'Mediacontent not found' });
            } else {
                res.status(200).json(mediacontent);
            }
        } catch (error) {
            handleError(res, error);
        }
    }

    updateMediacontent = async (req: Request, res: Response): Promise<void> => {
        try {
            const mediacontent = await this.mediacontentService.updateMediacontent(req.params.id, req.body);
            if (!mediacontent) {
                res.status(404).json({ error: 'Mediacontent not found' });
            } else {
                res.status(200).json(mediacontent);
            }
        } catch (error) {
            handleError(res, error);
        }
    }

    deleteMediacontent = async (req: Request, res: Response): Promise<void> => {
        try {
            const mediacontent = await this.mediacontentService.deleteMediacontent(req.params.id);
            if (!mediacontent) {
                res.status(404).json({ error: 'Mediacontent not found' });
            } else {
                res.status(200).json(mediacontent);
            }
        } catch (error) {
            handleError(res, error);
        }
    }
}