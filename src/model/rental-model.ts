import { Rental } from "@prisma/client";

export type RentalResponse = {
    userId: number
    unitId: number;
    due_date: Date;
}

export type ReturnRentalResponse = {
    userId: number
    unitId: number;
    due_date: Date;
    rent_start: Date;
    rent_end: Date | null;
    fine_per_day: Number;
    total_fine: number | null;
}

export type CreateRentalRequest = {
    userId: number
    unitId: number;
    due_date: Date;
}

export type ReturnRental = {
    rent_end: Date;
    total_fine: number;
}

export function toRentalResponse(rental: Rental) : RentalResponse {
    return {
        userId: rental.userId,
        unitId: rental.unitId,
        due_date: rental.due_date,
    }
}

export function toReturnRentalResponse(rental: Rental) : ReturnRentalResponse {
    return {
        userId: rental.userId,
        unitId: rental.unitId,
        due_date: rental.due_date,
        rent_start: rental.rent_start,
        rent_end: rental.rent_end,
        fine_per_day: rental.fine_per_day,
        total_fine: rental.total_fine,
    }
}