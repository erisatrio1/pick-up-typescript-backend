import 'dotenv/config';
import {z} from 'zod'

const envSchema = z.object({
    ACCESS_TOKEN_SECRET: z.string().min(1),
    REFRESH_TOKEN_SECRET: z.string().min(1),
    PORT: z.coerce.number().min(1)
})

export const env = envSchema.parse(process.env)