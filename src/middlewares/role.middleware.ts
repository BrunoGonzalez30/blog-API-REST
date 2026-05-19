import { Request, Response, NextFunction} from "express";
import AppError from "../errors/AppError.js";
import { Role } from "../generated/prisma/index.js";

export function roleMiddleware(requiredRole: Role) {
    return (req: Request, res: Response, next:NextFunction) => {
        if (!req.user) {
            return next(new AppError('User not authenticated', 401));
        }
        if (req.user.role !== requiredRole) {
            return next(new AppError('Forbidden: insufficient permissions', 403));
        }
        next();
    }
}