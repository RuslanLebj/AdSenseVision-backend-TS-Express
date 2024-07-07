import { MediacontentRepository } from '../repositories/mediacontentRepository';

export class MediacontentService {
    constructor(private mediacontentRepository: MediacontentRepository) {}

    async createMediacontent(mediacontentData: any): Promise<any> {
        return this.mediacontentRepository.create(mediacontentData);
    }

    async getAllMediacontent(): Promise<any[]> {
        return this.mediacontentRepository.getAll();
    }

    async getMediacontentById(id: number): Promise<any> {
        return this.mediacontentRepository.getById(id);
    }

    async updateMediacontent(id: number, mediacontentData: any): Promise<any> {
        return this.mediacontentRepository.update(id, mediacontentData);
    }

    async deleteMediacontent(id: number): Promise<any> {
        return this.mediacontentRepository.delete(id);
    }
}