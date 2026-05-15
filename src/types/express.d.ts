import  express  from "express";

declare module 'express' {
    interface Request {
        user?: {
            userId: string;
            email: string;     
        }
    }
}
