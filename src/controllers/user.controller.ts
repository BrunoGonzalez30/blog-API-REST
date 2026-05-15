import { getPostsByUserIdService } from "../services/post.service.js";
import { getAllUsersService, getUserByIdService, createUserService, updateUserService, deleteUserService } from "../services/user.service.js";
import { Request, Response, NextFunction } from "express";


export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await getAllUsersService();
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

export async function getUserById(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id as string;
    try {
        const user = await getUserByIdService(id);
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    try {
        const newUser = await createUserService(data);
        return res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id as string;
    const data = req.body;
    try {
        const updateUser = await updateUserService(id, data);
        return res.status(200).json(updateUser);
    } catch (error) {
        next(error);
    }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id as string;
    try {
        await deleteUserService(id);
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
}

export async function getPostsByUserId(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id as string;
    try {
        const posts = await getPostsByUserIdService(userId);
        return res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
}
