import  express  from "express";
import { Role } from "../generated/prisma/index.js";

declare module 'express' {
    interface Request {
        user?: {
            userId: string;
            email: string;    
            role: Role; 
        }
    }
}
