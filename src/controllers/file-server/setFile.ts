import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { NextFunction } from 'express';

export async function setFile(req: any, res: any) {
    try {
        const file = req.image;
        if (!file) {
            return res.status(400).send({ error: 'File not found' });
        }
        res.status(200).send({ ok: true, filename: file.originalname });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error });
    }
}

// (req: any, res: any) => {
//     const file = req.file;
//     if (!file) {
//         throw new Error('File upload failed');

//     //   const error = new Error('File upload failed');
//     //   error.statusCode = 400;
//     //   throw error;
//     }
//     res.json({ filename: file.originalname });
//   }

export const getUploadsPath = () => {
    const today = new Date();
    const year = today.getFullYear().toString();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return path.join(__dirname, 'uploads', year, month, day);
};

const storage = multer.diskStorage({
    destination: (req: any, file: Express.Multer.File, cb: Function) => {
        const uploadsPath = getUploadsPath();
        if (!fs.existsSync(uploadsPath)) {
            fs.mkdirSync(uploadsPath, { recursive: true });
        }
        cb(null, uploadsPath);
    },
    filename: (req: any, file: Express.Multer.File, cb: Function) => {
        cb(null, file.originalname);
    },
});

export const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 10, // 10 MB
    },
    fileFilter: (req: any, file: Express.Multer.File, cb: FileFilterCallback) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(file.mimetype)) {
            throw new Error('Invalid file type');
            // const error = new Error('Invalid file type');
            // error.statusCode = 400;
            // return cb(error, false);
        }
        cb(null, true);
    },
});

export const checkReferer = (req: any, res: any, next: NextFunction) => {
    const allowedReferers = ['https://example.com', 'https://www.example.com'];
    const referer = req.get('referer');
    if (!allowedReferers.includes(referer)) {
        return res.status(401).send('Unauthorized');
    }
    next();
};