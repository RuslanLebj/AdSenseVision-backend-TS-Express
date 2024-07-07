import { Response } from 'express';

//  Добавлен метод handleError, который проверяет, является ли error экземпляром Error.
//  Если это так, он возвращает сообщение ошибки.
//  В противном случае, возвращается сообщение об "неизвестной ошибке".
export const handleError = (res: Response, error: unknown): void => {
    if (error instanceof Error) {
        res.status(500).json({ error: error.message });
    } else {
        res.status(500).json({ error: 'Unknown error' });
    }
};