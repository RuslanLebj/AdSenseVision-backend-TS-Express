export interface ScreenEntity {
    id?: number;
    name: string;
    start_time: string; // Format should be 'HH:MM:SS'
    end_time: string; // Format should be 'HH:MM:SS'
    pause_time: string; // Format should be 'HH:MM:SS'
    update_date?: string; // Format should be 'YYYY-MM-DD'
}