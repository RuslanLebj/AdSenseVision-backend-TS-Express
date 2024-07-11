import { Knex } from 'knex';
import db from '../db/db';
import { BroadcastStationEntity } from '../entities/broadcastStationEntity';
import { CameraEntity } from '../entities/cameraEntity';
import { ScreenEntity } from '../entities/screenEntity';

export class BroadcastStationRepository {
    private readonly tableName = 'broadcast_station';

    constructor(private knex: Knex) {}

    async create(data: Omit<BroadcastStationEntity, 'id'>): Promise<BroadcastStationEntity> {
        const [createdBroadcastStation] = await this.knex(this.tableName)
            .insert(data)
            .returning('*');
        return createdBroadcastStation;
    }

    async getAll(): Promise<BroadcastStationEntity[]> {
        const broadcastStations = await this.knex(this.tableName).select('*');
        return Promise.all(broadcastStations.map(station => this.getDetails(station)));
    }

    async getById(id: string): Promise<BroadcastStationEntity | null> {
        const broadcastStation = await this.knex(this.tableName)
            .where({ id })
            .first();
        return broadcastStation ? this.getDetails(broadcastStation) : null;
    }

    async update(id: string, data: Partial<BroadcastStationEntity>): Promise<BroadcastStationEntity | null> {
        const [updatedBroadcastStation] = await this.knex(this.tableName)
            .where({ id })
            .update(data)
            .returning('*');
        return updatedBroadcastStation ? this.getDetails(updatedBroadcastStation) : null;
    }

    async delete(id: string): Promise<BroadcastStationEntity | null> {
        const [deletedBroadcastStation] = await this.knex(this.tableName)
            .where({ id })
            .delete()
            .returning('*');
        return deletedBroadcastStation ? this.getDetails(deletedBroadcastStation) : null;
    }

    private async getDetails(station: BroadcastStationEntity): Promise<BroadcastStationEntity> {
        const camera = await this.knex<CameraEntity>('camera').where({ id: station.camera_id }).first();
        const screen = await this.knex<ScreenEntity>('screen').where({ id: station.screen_id }).first();
        return { ...station, camera, screen };
    }
}

// Создание экземпляра репозитория с использованием db (knex)
const broadcastStationRepository = new BroadcastStationRepository(db);
export default broadcastStationRepository;