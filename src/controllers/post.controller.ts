import { getAllPostService, getPostByIdService, createPostService, updatePostService, deletePostService, getPostsByUserIdService } from "../services/post.service.js";
import {Request, Response, NextFunction } from "express";

export async function getAllPost(req: Request, res: Response, next: NextFunction) {
    try {
        const posts = await getAllPostService();
        return res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
}

export async function getPostById(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id as string;
    try {
        const post = await getPostByIdService(id);
        return res.status(200).json(post);
    } catch (error) {
        next(error);
    }
}

export async function createPost(req: Request, res: Response, next: NextFunction) {
    const { title, content, authorId } = req.body;
    try {
        const newPost = await createPostService(title, content, authorId);
        return res.status(201).json(newPost);
    } catch (error) {
        next(error);
    }
}

export async function updatePost(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id as string;
    const data = req.body;
    const userId = req.user?.userId as string;
    console.log('userId from token:', req.user?.userId);
    console.log('user role from token:', req.user?.role);

    try {
        const updatePost = await updatePostService(id, data, userId);
        return res.status(200).json(updatePost);
    } catch (error) {
        next(error);
    }
}

export async function deletePost(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id as string;
    const userId = req.user?.userId as string;
    const userRole = req.user?.role as string;
    console.log('user role from token:', req.user?.role);
    try {
        await deletePostService(id, userId, userRole);
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
}

