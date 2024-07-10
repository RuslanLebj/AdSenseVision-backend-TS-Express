import { CameraRepository } from '../repositories/cameraRepository';
import { CameraEntity } from '../entities/cameraEntity';

export class CameraService {
    constructor(private cameraRepository: CameraRepository) {}

    async createCamera(cameraData: any): Promise<CameraEntity> {
        return this.cameraRepository.create(cameraData);
    }

    async getAllCameras(): Promise<CameraEntity[]> {
        return this.cameraRepository.getAll();
    }

    async getCameraById(id: string): Promise<CameraEntity | null> {
        return this.cameraRepository.getById(id);
    }

    async updateCamera(id: string, cameraData: any): Promise<CameraEntity | null> {
        const updateData: Partial<CameraEntity> = {
            name: cameraData.name,
            url_address: cameraData.url_address,
            connection_login: cameraData.connection_login,
            connection_password: cameraData.connection_password
        };
        return this.cameraRepository.update(id, updateData);
    }

    async deleteCamera(id: string): Promise<CameraEntity | null> {
        return this.cameraRepository.delete(id);
    }
}