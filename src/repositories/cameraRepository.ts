import { Knex } from 'knex';
import db from '../db/db';
import { CameraEntity } from '../entities/cameraEntity';

export class CameraRepository {
    private readonly tableName = 'camera';

    constructor(private knex: Knex) {}

    async create(data: Omit<CameraEntity, 'id'>): Promise<CameraEntity> {
        const [createdCamera] = await this.knex(this.tableName)
            .insert(data)
            .returning('*');
        return createdCamera;
    }

    async getAll(): Promise<CameraEntity[]> {
        return this.knex(this.tableName).select('*');
    }

    async getById(id: string): Promise<CameraEntity | null> {
        const camera = await this.knex(this.tableName)
            .where({ id })
            .first();
        return camera || null;
    }

    async update(id: string, data: Partial<CameraEntity>): Promise<CameraEntity | null> {
        const [updatedCamera] = await this.knex(this.tableName)
            .where({ id })
            .update(data)
            .returning('*');
        return updatedCamera || null;
    }

    async delete(id: string): Promise<CameraEntity | null> {
        const [deletedCamera] = await this.knex(this.tableName)
            .where({ id })
            .delete()
            .returning('*');
        return deletedCamera || null;
    }
}

// Создание экземпляра репозитория с использованием db (knex)
const cameraRepository = new CameraRepository(db);
export default cameraRepository;