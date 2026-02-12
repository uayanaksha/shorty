import {model, Schema} from "mongoose";
import { Chunk } from "../types/chunk";

const ChunkSchema: Schema = new Schema<Chunk>({
    source: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
    },
    description: {
        type: String,
    },
}, {
    timestamps: true,
})

const Chunk = model("Chunk", ChunkSchema);
export { Chunk };
