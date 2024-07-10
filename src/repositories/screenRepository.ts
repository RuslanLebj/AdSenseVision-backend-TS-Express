import { Knex } from 'knex';
import db from '../db/db';
import { ScreenEntity } from '../entities/screenEntity';

export class ScreenRepository {
    private readonly tableName = 'screen';

    constructor(private knex: Knex) {}

    async create(data: Omit<ScreenEntity, 'id'>): Promise<ScreenEntity> {
        const [createdScreen] = await this.knex(this.tableName)
            .insert(data)
            .returning('*');
        return this.formatScreen(createdScreen);
    }

    async getAll(): Promise<ScreenEntity[]> {
        const screens = await this.knex(this.tableName).select('*');
        return screens.map(this.formatScreen);
    }

    async getById(id: string): Promise<ScreenEntity | null> {
        const screen = await this.knex(this.tableName)
            .where({ id })
            .first();
        return screen ? this.formatScreen(screen) : null;
    }

    async update(id: string, data: Partial<ScreenEntity>): Promise<ScreenEntity | null> {
        const [updatedScreen] = await this.knex(this.tableName)
            .where({ id })
            .update(data)
            .returning('*');
        return updatedScreen ? this.formatScreen(updatedScreen) : null;
    }

    async delete(id: string): Promise<ScreenEntity | null> {
        const [deletedScreen] = await this.knex(this.tableName)
            .where({ id })
            .delete()
            .returning('*');
        return deletedScreen ? this.formatScreen(deletedScreen) : null;
    }

    // Форматирование данных (даты) в нужный формат
    private formatScreen(screen: ScreenEntity): ScreenEntity {
        return {
            ...screen,
            update_date: screen.update_date && new Date(screen.update_date).toISOString().split('T')[0],
        };
    }
}

// Создание экземпляра репозитория с использованием db (knex)
const screenRepository = new ScreenRepository(db);
export default screenRepository;