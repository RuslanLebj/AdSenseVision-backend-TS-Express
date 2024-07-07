import { Knex } from 'knex';
import db from '../db/db';
import { MediacontentEntity } from '../entities/mediacontentEntity';

export class MediacontentRepository {
    private readonly tableName = 'media_content';

    constructor(private knex: Knex) {}

    async create(data: Omit<MediacontentEntity, 'id'>): Promise<MediacontentEntity> {
        const [createdMediacontent] = await this.knex(this.tableName)
            .insert(data)
            .returning('*');
        return createdMediacontent;
    }

    async getAll(): Promise<MediacontentEntity[]> {
        return this.knex(this.tableName).select('*');
    }

    async getById(id: number): Promise<MediacontentEntity | null> {
        const mediacontent = await this.knex(this.tableName)
            .where({ id })
            .first();
        return mediacontent || null;
    }

    async update(id: number, data: Partial<MediacontentEntity>): Promise<MediacontentEntity | null> {
        const [updatedMediacontent] = await this.knex(this.tableName)
            .where({ id })
            .update(data)
            .returning('*');
        return updatedMediacontent || null;
    }

    async delete(id: number): Promise<MediacontentEntity | null> {
        const [deletedMediacontent] = await this.knex(this.tableName)
            .where({ id })
            .delete()
            .returning('*');
        return deletedMediacontent || null;
    }
}

// Создание экземпляра репозитория с использованием db (knex)
const mediacontentRepository = new MediacontentRepository(db);
export default mediacontentRepository;