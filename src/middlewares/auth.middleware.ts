import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import AppError from '../errors/AppError.js';
import { Role } from '../generated/prisma/index.js';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(new AppError('Authorization header missing', 401));
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return next(new AppError('Token missing', 401));
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET as string);
        req.user = decoded as { userId: string, email: string, role: Role };
        next();
    } catch (error) {
        return next(new AppError('Unauthorized', 401));
    }
}

