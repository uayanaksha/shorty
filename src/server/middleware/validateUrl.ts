import type { Request, Response, NextFunction } from "express";
import z from "zod";

export async function validateUrl(req: Request, res: Response, next: NextFunction) {
    try {
        const url = (await req.body?.url ?? "");
        // Parse url
        const { data, success, error } = z.url().safeParse(url);
        if (!success) {
            res.status(400).send(error.message);
            return;
        }
        // Check for 100~399 status-code
        const status = await (await fetch(url)).status;
        if (status >= 400) {
            res.status(status).send("Invalid Url");
            return;
        }
        req.body.url = data;
        next();
    } catch (err) {
        res.status(400).send((err instanceof z.ZodError) ? err.message : "Validation Error");
        return;
    }
}