import { ScreenRepository } from '../repositories/screenRepository';
import { ScreenEntity } from '../entities/screenEntity';

export class ScreenService {
    constructor(private screenRepository: ScreenRepository) {}

    async createScreen(screenData: any): Promise<ScreenEntity> {
        return this.screenRepository.create(screenData);
    }

    async getAllScreens(): Promise<ScreenEntity[]> {
        return this.screenRepository.getAll();
    }

    async getScreenById(id: string): Promise<ScreenEntity | null> {
        return this.screenRepository.getById(id);
    }

    async updateScreen(id: string, screenData: any): Promise<ScreenEntity | null> {
        const updateData: Partial<ScreenEntity> = {
            name: screenData.name,
            start_time: screenData.start_time,
            end_time: screenData.end_time,
            pause_time: screenData.pause_time,
            update_date: screenData.update_date
        };
        return this.screenRepository.update(id, updateData);
    }

    async deleteScreen(id: string): Promise<ScreenEntity | null> {
        return this.screenRepository.delete(id);
    }
}