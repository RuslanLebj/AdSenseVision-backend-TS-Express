import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Создаем директорию для хранения файлов, если она не существует
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.mp4' && ext !== '.mkv') {
            return cb(new Error('Only videos are allowed'));
        }
        cb(null, true);
    },
});

export default upload;