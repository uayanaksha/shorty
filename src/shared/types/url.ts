import z from "zod";

export const UrlSchema = z.url();
export type Url = z.infer<typeof UrlSchema>;