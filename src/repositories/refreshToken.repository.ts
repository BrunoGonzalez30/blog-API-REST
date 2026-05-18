import prisma from "../lib/prisma.js";
import {RefreshToken} from "../generated/prisma/index.js";

export function createRefreshToken(token: string, userId: string, expiresAt: Date) : Promise<RefreshToken> {
    return prisma.refreshToken.create({
        data: {
            token,
            userId,
            expiresAt
        }
    })
}

export function findRefreshToken(token: string) : Promise<RefreshToken | null> {
    return prisma.refreshToken.findUnique({
        where: {
            token: token
        }
    })
}

export function deleteRefreshToken(token: string) : Promise<RefreshToken> {
    return prisma.refreshToken.delete({
        where: {
            token: token
        }
    })
}

export function deleteAllUserRefreshTokens(userId: string) : Promise<{ count: number }> {
    return prisma.refreshToken.deleteMany({
        where: {
            userId: userId
        }
    })
}