import prisma from '../lib/prisma.js';
import {User, Prisma} from '../generated/prisma/index.js';

export function getAllUsers() : Promise<User[]> { 
    return prisma.user.findMany();
}

export function getUserById(id: string) :Promise<User | null> {
    return prisma.user.findUnique({
        where: {
            id: id
        }
    })
}

export function createUser(data: Prisma.UserCreateInput) : Promise<User> {
    return prisma.user.create({
        data: data
    })
}

export function updateUser(id: string, data: Prisma.UserUpdateInput) : Promise<User> {
    return prisma.user.update({
        where: {
            id: id
        },
        data: data
    })
}

export function deleteUser(id: string) : Promise<User> {
    return prisma.user.delete({
        where: {
            id: id
        }
    })
}