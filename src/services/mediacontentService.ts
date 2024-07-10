import { MediacontentRepository } from '../repositories/mediacontentRepository';
import {MediacontentEntity} from "../entities/mediacontentEntity";

export class MediacontentService {
    constructor(private mediacontentRepository: MediacontentRepository) {}

    async createMediacontent(mediacontentData: any): Promise<any> {
        return this.mediacontentRepository.create(mediacontentData);
    }

    async getAllMediacontent(): Promise<any[]> {
        return this.mediacontentRepository.getAll();
    }

    async getMediacontentById(id: string): Promise<any> {
        return this.mediacontentRepository.getById(id);
    }

    async updateMediacontent(id: string, mediacontentData: any): Promise<any> {
        const updateData: Partial<MediacontentEntity> = {
            name: mediacontentData.name,
            description: mediacontentData.description
        };
        return this.mediacontentRepository.update(id, updateData);
    }

    async deleteMediacontent(id: string): Promise<any> {
        return this.mediacontentRepository.delete(id);
    }
}