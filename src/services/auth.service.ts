import { getUserByEmail, createUser } from "../repositories/user.repository.js";
import { Prisma } from '../generated/prisma/index.js';
import bcrypt from 'bcrypt';
import AppError from "../errors/AppError.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export async function RegisterService(name: string, surname: string, email: string, password: string) {
    if (!name || !surname || !email || !password) {
        throw new AppError('Missing required fields: name, surname, email, password', 400);
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        throw new AppError('Email already exists', 409);
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
        throw new AppError("Invalid password. Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
        name,
        surname,
        email,
        password: hashedPassword
    })

    const {password: _, ...userWithoutPassword} = user;

    return userWithoutPassword;
}

export async function loginService(email: string, password: string) {
    if (!email || ! password) {
        throw new AppError('Missing required fields: email, password', 400);
    }

    const user = await getUserByEmail(email);
    if (!user) {
        throw new AppError('invalid email or password', 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new AppError('invalid email or password', 401);
    }

    const {password: _, ...userWithoutPassword} = user;
    const token = jwt.sign({userId: user.id, email: user.email}, JWT_SECRET!, {expiresIn: '1h'});

    return {token, user: userWithoutPassword};
}