import type { Request, Response, NextFunction } from "express";
import { env } from "@/shared/constants/env";
import mongoose from "mongoose";

export async function connectDB(_req: Request, res: Response, next: NextFunction){
    try {
        if(mongoose.connection.readyState != 1){
            const DBOPTS: mongoose.ConnectOptions = { dbName: env.DB_NAME };
            await mongoose.connect(env.DB_URL, DBOPTS)
            .then(() => console.log(`[DB connected]`, new Date().toJSON()));
        } 
        next();
    } catch (err){
        res.status(400).send((err instanceof String) ? err : "Db connection failed");
        return;
    }
}