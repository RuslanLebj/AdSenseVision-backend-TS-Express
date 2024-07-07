export interface MediacontentDTO {
    id: number;
    video: string;
    name?: string;
    description?: string;
    upload_date?: string;
    duration?: string;
    preview?: string;
}

export interface NewMediacontentDTO {
    video: string;
    name?: string;
    description?: string;
    upload_date?: string;
    duration?: string;
    preview?: string;
}

export interface UpdateMediacontentDTO {
    video?: string;
    name?: string;
    description?: string;
    upload_date?: string;
    duration?: string;
    preview?: string;
}