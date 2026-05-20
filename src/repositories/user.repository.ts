import prisma from '../lib/prisma.js';
import {User, Prisma} from '../generated/prisma/index.js';

export function getAllUsers() { 
    return prisma.user.findMany({
        omit: {password: true}
    });
}

export function getUserById(id: string) {
    return prisma.user.findUnique({
        where: {
            id: id
        },
        omit: {password: true}
    })
}

export function getUserByEmail(email: string) :Promise<User | null> {
    return prisma.user.findUnique({
        where: {
            email: email
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