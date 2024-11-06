import { NextFunction } from "express";

export async function adminMid(req: any, res: any, next: NextFunction) {
    try {
        const { role } = req;
        if (role !== 'admin') {
            res.status(401).send({ error: 'User not authorized' });
            return;
        }
        next();
    } catch (error) {
        console.error(error);
        res.send(error);
    }
}