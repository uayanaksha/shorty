import express from "express";
import baseRoute from './router'
import { env } from "@/shared/constants/env";
import Cors, { CorsOptions } from "cors";

const app = express();
const CORSOPTS: CorsOptions = {
    origin: env.HOST,
    methods: ["GET", "POST"],
}

app.use([
    Cors(CORSOPTS)
])

app.route('/').get((_req, res) => {
    res.status(200).json(`Server is active`);
    return;
})

app.use('/', baseRoute)

app.listen(env.PORT, () => console.log(`server active at ${env.HOST}`))