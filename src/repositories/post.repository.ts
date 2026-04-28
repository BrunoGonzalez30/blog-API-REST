import prisma from '../lib/prisma.js';
import {Post, Prisma} from '../generated/prisma/index.js';

export function getAllPost() : Promise<Post[]> {
    return prisma.post.findMany({
        include: {
            author: true
        }
    });
}

export function getPostById(id: string) :Promise<Post | null> {
    return prisma.post.findUnique({
        where: {
            id: id
        },
        include: {
            author: true
        }
    })
}

export function createPost(data: Prisma.PostCreateInput) : Promise<Post> {
    return prisma.post.create({
        data: data
    })
}

export function updatePost(id: string, data: Prisma.PostUpdateInput) : Promise<Post> {
    return prisma.post.update({
        where: {
            id: id
        },
        data: data
    })
}

export function deletePost(id: string) : Promise<Post> {
    return prisma.post.delete({
        where: {
            id: id
        }
    })
}

export function getPostsByUserId(userId: string) : Promise<Post[]> {
    return prisma.post.findMany({
        where: {
            authorId: userId
        }
    })
}