import {Request, Response} from 'express';
import {MediaContentService} from '../services/mediaContentService';
import {handleError} from '../utils/errorHandler';
import {extractMetadata} from "../services/metadataService";

export class MediaContentController {
    constructor(private mediaContentService: MediaContentService) {
    }

    createMediaContent = async (req: Request, res: Response): Promise<void> => {
        try {
            const file = req.file;
            if (!file) {
                res.status(400).json({error: 'No file uploaded'});
                return;
            }

            const metadata = await extractMetadata(file.path);
            const mediaContent = await this.mediaContentService.createMediaContent({
                ...metadata,
                video: file.path,
                ...req.body,
            });
            res.status(201).json(mediaContent);
        } catch (error) {
            handleError(res, error);
        }
    }

    getAllMediaContent = async (req: Request, res: Response): Promise<void> => {
        try {
            const mediaContent = await this.mediaContentService.getAllMediaContent();
            res.status(200).json(mediaContent);
        } catch (error) {
            handleError(res, error);
        }
    }

    getMediaContentById = async (req: Request, res: Response): Promise<void> => {
        try {
            const mediaContent = await this.mediaContentService.getMediaContentById(req.params.id);
            if (!mediaContent) {
                res.status(404).json({error: 'MediaContent not found'});
            } else {
                res.status(200).json(mediaContent);
            }
        } catch (error) {
            handleError(res, error);
        }
    }

    updateMediaContent = async (req: Request, res: Response): Promise<void> => {
        try {
            const mediaContent = await this.mediaContentService.updateMediaContent(req.params.id, req.body);
            if (!mediaContent) {
                res.status(404).json({error: 'MediaContent not found'});
            } else {
                res.status(200).json(mediaContent);
            }
        } catch (error) {
            handleError(res, error);
        }
    }

    deleteMediaContent = async (req: Request, res: Response): Promise<void> => {
        try {
            const mediaContent = await this.mediaContentService.deleteMediaContent(req.params.id);
            if (!mediaContent) {
                res.status(404).json({error: 'MediaContent not found'});
            } else {
                res.status(200).json(mediaContent);
            }
        } catch (error) {
            handleError(res, error);
        }
    }
}