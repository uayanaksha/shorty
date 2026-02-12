import * as z from "zod";
function loadEnv() {
  try {
    const PORT = z.coerce.number().safeParse(process.env?.PORT);
    const HOST = z.url().safeParse(process.env?.HOST);
    const DB_URL = z.string().safeParse(process.env?.DB_URL);
    const DB_NAME = z.string().safeParse(process.env?.DB_NAME);
    const HASH_KEY = z.string().safeParse(process.env?.HASH_KEY);
    [PORT, HOST, HASH_KEY, DB_URL, DB_NAME].forEach(({data: _, success, error}) => {
      if (!success) throw new Error(error.message);
    });
    return { 
      PORT: PORT.data!,
      HOST: HOST.data!,
      HASH_KEY: HASH_KEY.data!,
      DB_URL: DB_URL.data!,
      DB_NAME: DB_NAME.data!
    };
  } catch (err) {
    console.error("Error while loading environment variables: ", err)
    process.exit(1);
  }
}

export const env = loadEnv();