import * as z from "zod";

export const ChunkSchema = z.object({
  _id: z.string(),
  source: z.url(),
  hash: z.string().length(12),
  description: z.string().optional(),
  createdAt: z.iso.datetime({ "local": true }).default(new Date().toISOString()).optional(),
  updatedAt: z.iso.datetime({ "local": true }).default(new Date().toISOString()).optional()
})

export const CreateChunkSchema = ChunkSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true
})

export const ResponseObjectSchema = ChunkSchema.omit({
  _id: true,
  description: true,
  createdAt: true,
  updatedAt: true,
})

export type Chunk = z.infer<typeof ChunkSchema>
export type CreateChunk = z.infer<typeof CreateChunkSchema>
export type ResponseObject = z.infer<typeof ResponseObjectSchema>