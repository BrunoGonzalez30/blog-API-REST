import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../repositories/user.repository.js";
import {Prisma} from '../generated/prisma/index.js';
import  AppError  from "../errors/AppError.js";

export async function getAllUsersService() {
    return await getAllUsers();
}

export async function getUserByIdService(id: string) {
    const user = await getUserById(id);
    if (user === null) {
        throw new AppError(`User with id ${id} not found`, 404);
    }
    return user;
}

export async function createUserService(data: Prisma.UserCreateInput) {
    if (!data.name || !data.surname || !data.email || !data.password) {
        throw new AppError('Missing required fields: name, surname, email, password', 400);
    }

    try {

        return await createUser(data);

    } catch (error: any) {

        if (error.code === 'P2002') {  
            throw new AppError('Email already exists', 409);
        }
        
        throw error;

    }
}

export async function updateUserService(id: string, data: Prisma.UserUpdateInput, userId: string) {
    try {
        return await updateUser(id, data);
    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new AppError(`User with id ${id} not found`, 404);
        }
        throw error;
    }
}

export async function deleteUserService(id: string) {

    try {
        return await deleteUser(id);
    } catch (error: any) {
        const code = error.code ?? error.cause?.code;
        if (code === 'P2025') {
            throw new AppError(`User with id ${id} not found`, 404);
        }
        if (code === '23001') {
            throw new AppError(`Cannot delete user with id ${id} because they have associated posts`, 400);
        }
        throw error;
    }
}