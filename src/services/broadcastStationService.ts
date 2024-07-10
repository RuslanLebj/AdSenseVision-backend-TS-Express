import { BroadcastStationRepository } from '../repositories/broadcastStationRepository';
import { BroadcastStationEntity } from '../entities/broadcastStationEntity';

export class BroadcastStationService {
    constructor(private broadcastStationRepository: BroadcastStationRepository) {}

    async createBroadcastStation(broadcastStationData: any): Promise<BroadcastStationEntity> {
        return this.broadcastStationRepository.create(broadcastStationData);
    }

    async getAllBroadcastStations(): Promise<BroadcastStationEntity[]> {
        return this.broadcastStationRepository.getAll();
    }

    async getBroadcastStationById(id: string): Promise<BroadcastStationEntity | null> {
        return this.broadcastStationRepository.getById(id);
    }

    async updateBroadcastStation(id: string, broadcastStationData: any): Promise<BroadcastStationEntity | null> {
        const updateData: Partial<BroadcastStationEntity> = {
            name: broadcastStationData.name,
            camera_id: broadcastStationData.camera_id,
            screen_id: broadcastStationData.screen_id,
            location_address: broadcastStationData.location_address
        };
        return this.broadcastStationRepository.update(id, updateData);
    }

    async deleteBroadcastStation(id: string): Promise<BroadcastStationEntity | null> {
        return this.broadcastStationRepository.delete(id);
    }
}