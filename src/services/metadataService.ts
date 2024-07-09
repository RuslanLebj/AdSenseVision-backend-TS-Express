import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';


// Если используются версии ffmpeg из npm модулей
// import ffmpegStatic from 'ffmpeg-static';
// import ffprobeStatic from 'ffprobe-static';
// // Устанавливаем путь к ffmpeg из ffmpeg-static, проверяем, что путь не равен null
// if (ffmpegStatic) {
//     ffmpeg.setFfmpegPath(ffmpegStatic);
// } else {
//     throw new Error('ffmpeg-static path is null');
// }
//
// // Устанавливаем путь к ffprobe из ffprobe-static, проверяем, что путь не равен null
// if (ffprobeStatic.path) {
//     ffmpeg.setFfprobePath(ffprobeStatic.path);
// } else {
//     throw new Error('ffprobe-static path is null');
// }


// Проверка наличия доступа к ffmpeg, ffprobe
const checkFFmpegAvailability = () => {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe('-version', (err) => {
            if (err) {
                reject(new Error('ffmpeg is not installed or not available in PATH'));
            } else {
                resolve(true);
            }
        });
    });
};


// Функция для преобразования секунд в формат hh:mm:ss
const formatDuration = (duration: number): string => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);
    return [hours, minutes, seconds]
        .map(val => String(val).padStart(2, '0'))
        .join(':');
};


// Конфигурация для скриншотов
const previewConfig = {
    timestamps: ['10%'],
    size: '1920x1080',
};


const generatePreview = (filePath: string, outputDir: string): Promise<string> => {
    return new Promise((resolve, reject) => {

        // Проверка существования входного файла
        if (!fs.existsSync(filePath)) {
            return reject(new Error(`File not found: ${filePath}`));
        }

        // Проверка существования выходной директории, если директории не существует, она создается (позволяет создать все промежуточные директории, если их нет)
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputFilePath = path.join(outputDir, `${Date.now()}-preview.jpg`);
        ffmpeg(filePath)
            .on('start', (commandLine) => {
                console.log('Spawned Ffmpeg with command: ' + commandLine);
            })
            .screenshots({
                filename: path.basename(outputFilePath),
                folder: outputDir,
                timestamps: previewConfig.timestamps,
                size: previewConfig.size
            })
            .on('end', () => {
                console.log('Preview generated:', outputFilePath);
                resolve(outputFilePath);
            })
            .on('error', (err) => {
                console.error('Error generating preview:', err);
                reject(err);
            })
            .on('stderr', (stderrLine) => {
                console.error('Stderr output: ' + stderrLine);
            });
    });
};


export const extractMetadata = async (filePath: string): Promise<{
    duration: string,
    name: string,
    upload_date: string,
    preview: string
}> => {
    return new Promise(async (resolve, reject) => {

        try {
            await checkFFmpegAvailability();
        } catch (err) {
            return reject(err);
        }

        ffmpeg.ffprobe(filePath, async (err, metadata) => {
            if (err) {
                return reject(new Error(`ffprobe error: ${err.message}`));
            }

            const { format, streams } = metadata;
            const videoStream = streams.find(stream => stream.codec_type === 'video');

            const upload_date = new Date().toISOString();
            const name = format.filename ? path.basename(format.filename) || 'unknown' : 'unknown';
            const duration = format.duration ? formatDuration(format.duration) : '00:00:00';

            try {
                const preview = await generatePreview(filePath, 'uploads/');
                resolve({ duration, name, upload_date, preview });
            } catch (previewErr) {
                reject(previewErr);
            }
        });
    });
};