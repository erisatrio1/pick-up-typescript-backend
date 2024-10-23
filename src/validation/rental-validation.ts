import { z, ZodType } from "zod";

export class RentalValidation {

    static readonly CREATE: ZodType = z.object({
        userId: z.number().positive(),
        unitId: z.number().positive(),
        due_date: z.date()
    })

    static readonly RETURN: ZodType = z.object({
        rent_end: z.date(),
        total_fine: z.number()
    })

}