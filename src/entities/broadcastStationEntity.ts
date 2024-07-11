import {CameraEntity} from "./cameraEntity";
import {ScreenEntity} from "./screenEntity";

export interface BroadcastStationEntity {
    id?: number;
    name: string;
    camera_id: number;
    screen_id: number;
    location_address?: string;
    camera?: CameraEntity; // Дополнительные поля для полной информации
    screen?: ScreenEntity; // Дополнительные поля для полной информации
}