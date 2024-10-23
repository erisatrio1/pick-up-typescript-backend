import { z, ZodType } from "zod";

export class UnitValidation {

    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(100),
        categories: z.array(z.object({
            category: z.string().min(1) 
        })),
        price: z.number().min(1) 
    })

    static readonly UPDATE: ZodType = z.object({
        id: z.number().positive(),
        name: z.string().min(1).max(100),
        categories: z.array(z.object({
            category: z.string().min(1) 
        })),
        price: z.number().min(1) 
    })

    static readonly SEARCH: ZodType = z.object({
        name: z.string().min(1).optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive()
    })

}