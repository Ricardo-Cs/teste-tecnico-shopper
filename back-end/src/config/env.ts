require('dotenv').config();

import z from "zod";

const envSchema = z.object({
    GOOGLE_API_KEY: z.string(),
    PORT: z.coerce.number().default(8080)
});

export const env = envSchema.parse({
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    PORT: 8080
});