import { RegisterService, loginService } from "../services/auth.service.js";
import { Request, Response, NextFunction } from "express";

export async function register(req: Request, res: Response, next: NextFunction) {
    const { name, surname, email, password } = req.body;
    try {
        const user = await RegisterService(name, surname, email, password);
        return res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
        const data = await loginService(email, password);
        return res.status(200).json({ user: data.user, token: data.token });
    } catch (error) {
        next(error);
    }
}