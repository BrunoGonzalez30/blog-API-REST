import { RegisterService, loginService, refreshTokenService, logoutAllService, logoutService  } from "../services/auth.service.js";
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
        return res.status(200).json({ user: data.user, token: data.token, refreshToken: data.refreshToken });
    } catch (error) {
        next(error);
    }
}

export async function refreshToken(req: Request, res: Response, next: NextFunction) {
    const { token } = req.body;
    try {
        const data = await refreshTokenService(token);
        return res.status(200).json({ token: data.token });
    } catch (error) {
        next(error);
    }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
    const { token } = req.body;
    try {
        await logoutService(token);
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
}

export async function logoutAll(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId as string;
    try {
        await logoutAllService(userId);
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
}