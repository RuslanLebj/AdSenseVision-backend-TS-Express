import { MediaContentRepository } from '../repositories/mediaContentRepository';
import {MediaContentEntity} from "../entities/mediaContentEntity";

export class MediaContentService {
    constructor(private mediaContentRepository: MediaContentRepository) {}

    async createMediaContent(mediacontentData: any): Promise<any> {
        return this.mediaContentRepository.create(mediacontentData);
    }

    async getAllMediaContent(): Promise<any[]> {
        return this.mediaContentRepository.getAll();
    }

    async getMediaContentById(id: string): Promise<any> {
        return this.mediaContentRepository.getById(id);
    }

    async updateMediaContent(id: string, mediaContentData: any): Promise<any> {
        const updateData: Partial<MediaContentEntity> = {
            name: mediaContentData.name,
            description: mediaContentData.description
        };
        return this.mediaContentRepository.update(id, updateData);
    }

    async deleteMediaContent(id: string): Promise<any> {
        return this.mediaContentRepository.delete(id);
    }
}