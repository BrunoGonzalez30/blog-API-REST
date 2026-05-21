import { getAllPost, getPostById, createPost, updatePost, deletePost, getPostsByUserId } from "../repositories/post.repository.js";
import { getUserById } from "../repositories/user.repository.js";
import {Prisma} from '../generated/prisma/index.js';
import AppError  from "../errors/AppError.js";

export async function getAllPostService() {
    return await getAllPost();
}

export async function getPostByIdService(id: string) {
    const post = await getPostById(id);
    if (post === null) {
        throw new AppError(`Post with id ${id} not found`, 404);
    }
    return post;
}

export async function createPostService(title: string, content: string, authorId: string) {
    const user = await getUserById(authorId);

    if (!user) {
        throw new AppError(`User with id ${authorId} not found`, 404);
    }

    return await createPost({
        title,
        content,
        author: {
            connect: {
                id: authorId
            }
        }
    })

}

export async function updatePostService(id: string, data: Prisma.PostUpdateInput, userId: string) {
    try {
        const post = await getPostById(id);
        console.log('post authorId:', post?.authorId);
        if (!post) {
            throw new AppError(`Post with id ${id} not found`, 404);
        }

        if (post.authorId !== userId) {
            throw new AppError('You are not authorized to update this post', 403);
        }

        return await updatePost(id, data);

    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new AppError(`Post with id ${id} not found`, 404);
        }
        throw error;
    }
}

export async function deletePostService(id: string, userIdFromToken: string, userRole: string) {
    try {
        const post = await getPostById(id);

        if (!post) {
            throw new AppError(`Post with id ${id} not found`, 404);
        }
        if (post.authorId !== userIdFromToken && userRole !== 'ADMIN') {
            throw new AppError('You are not authorized to delete this post', 403);
        }

      return await deletePost(id);  

    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new AppError(`Post with id ${id} not found`, 404);
        }
        throw error;
    }
}

export async function getPostsByUserIdService(userId: string) {
     
    const user = await getUserById(userId);

    if (!user) {
        throw new AppError(`User with id ${userId} not found`, 404);
    }

    return await getPostsByUserId(userId);
}