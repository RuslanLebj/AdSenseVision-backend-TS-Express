import { Knex } from 'knex';
import db from '../db/db';
import { BroadcastStationEntity } from '../entities/broadcastStationEntity';

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
        return this.knex(this.tableName).select('*');
    }

    async getById(id: string): Promise<BroadcastStationEntity | null> {
        const broadcastStation = await this.knex(this.tableName)
            .where({ id })
            .first();
        return broadcastStation || null;
    }

    async update(id: string, data: Partial<BroadcastStationEntity>): Promise<BroadcastStationEntity | null> {
        const [updatedBroadcastStation] = await this.knex(this.tableName)
            .where({ id })
            .update(data)
            .returning('*');
        return updatedBroadcastStation || null;
    }

    async delete(id: string): Promise<BroadcastStationEntity | null> {
        const [deletedBroadcastStation] = await this.knex(this.tableName)
            .where({ id })
            .delete()
            .returning('*');
        return deletedBroadcastStation || null;
    }
}

// Создание экземпляра репозитория с использованием db (knex)
const broadcastStationRepository = new BroadcastStationRepository(db);
export default broadcastStationRepository;