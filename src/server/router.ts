import express, { Request, Response, Router } from "express";
import { Chunk } from "@/shared/db/chunk.model";
import { CreateChunk } from "@/shared/types/chunk";
import mongoose from "mongoose";
import { env } from "@/shared/constants/env";
import { connectDB } from "./middleware/connectDB";
import { validateUrl } from "./middleware/validateUrl";

const router = Router();

// middlewares
router.use([
    express.json(),
    connectDB,
]);

router.route('/')
    .get((_req, res) => {
        res.send(`Server is active`);
        return;
    })
    .post([validateUrl], async (req: Request, res: Response) => {
        try {
            const url = await req.body?.url;
            let shortened_link = env.HOST;
            const output = await Chunk.findOne<Chunk>({
                source: url
            }, { _id: false, hash: true });
            if (!!output) {
                shortened_link += output.hash;
                res.status(200).send(shortened_link)
                return;
            }
            const hashcode = new mongoose.Types.ObjectId().toHexString();
            if (!hashcode) throw new Error("Failed to hash!")
            const newChunk: CreateChunk = { source: url, hash: hashcode };
            const insertion_response = await Chunk.insertOne(newChunk);
            if (!!insertion_response) {
                shortened_link += hashcode;
                res.status(200).send(shortened_link);
                return;
            }
            res.status(500).send("Internal Server Error");
            return;
        } catch (err) {
            res.status(400).send((err instanceof String) ? err : "Insert/Find unsuccessfull")
            return;
        }
    })
    .all((_req, res) => {
        res.send('GET/POST method is allowed')
        return;
    });

router.route('/:hash')
    .get([connectDB], async (req: Request, res: Response) => {
        try {
            const hash = req?.params?.hash || null;
            if (!hash) {
                res.status(400).send("Invalid URL");
                return;
            }
            const data = await Chunk.findOne<Chunk>({ hash }, {
                _id: false,
                source: true,
            })
            if (!!data) {
                res.status(301).redirect(data.source);
                return;
            }
            res.status(404).json("Invalid hash");
            return;
        } catch (err) {
            if (err instanceof String) {
                res.status(400).send(err)
                return;
            }
            res.status(400).send("Redirect unsuccessfull")
            return;
        }
    })
    .all((_req, res) => {
        res.send('GET method is allowed')
        return;
    })


export default router;