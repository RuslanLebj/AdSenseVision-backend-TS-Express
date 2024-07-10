import { Knex } from 'knex';
import db from '../db/db';
import { MediaContentEntity } from '../entities/mediaContentEntity';

export class MediaContentRepository {
    private readonly tableName = 'media_content';

    constructor(private knex: Knex) {}

    async create(data: Omit<MediaContentEntity, 'id'>): Promise<MediaContentEntity> {
        const [createdMediaContent] = await this.knex(this.tableName)
            .insert(data)
            .returning('*');
        return createdMediaContent;
    }

    async getAll(): Promise<MediaContentEntity[]> {
        return this.knex(this.tableName).select('*');
    }

    async getById(id: string): Promise<MediaContentEntity | null> {
        const mediaContent = await this.knex(this.tableName)
            .where({ id })
            .first();
        return mediaContent || null;
    }

    async update(id: string, data: Partial<MediaContentEntity>): Promise<MediaContentEntity | null> {
        const [updatedMediaContent] = await this.knex(this.tableName)
            .where({ id })
            .update(data)
            .returning('*');
        return updatedMediaContent || null;
    }

    async delete(id: string): Promise<MediaContentEntity | null> {
        const [deletedMediaContent] = await this.knex(this.tableName)
            .where({ id })
            .delete()
            .returning('*');
        return deletedMediaContent || null;
    }
}

// Создание экземпляра репозитория с использованием db (knex)
const mediaContentRepository = new MediaContentRepository(db);
export default mediaContentRepository;