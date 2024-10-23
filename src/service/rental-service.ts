import { Rental } from "@prisma/client";
import { prismaClient } from "../application/database";
import { CreateRentalRequest, RentalResponse, ReturnRental, ReturnRentalResponse, toRentalResponse, toReturnRentalResponse } from "../model/rental-model"
import { RentalValidation } from "../validation/rental-validation";
import { Validation } from "../validation/validation";
import { ResponseError } from "../error/response-error";

export class RentalService {

    static async rent(request: CreateRentalRequest ) : Promise<RentalResponse>{

        const createRequest = Validation.validate(RentalValidation.CREATE, request);

        const newRental = await prismaClient.rental.create({
            data: createRequest
        });

        return toRentalResponse(newRental);
    }

    static async returnRent(rentId: number, request: ReturnRental ) : Promise<ReturnRentalResponse>{

        const createRequest = Validation.validate(RentalValidation.RETURN, request);

        const updatedRental = await prismaClient.rental.update({
            where: { id: rentId },
            data: createRequest
          });

        return toReturnRentalResponse(updatedRental);
    }

    static async getAll(): Promise<Rental[]> {
        const rental = await prismaClient.rental.findMany();

        if(!rental){
            throw new ResponseError(404, "Rental not found");
        }

        return rental;
    }

    static async checkUnitMustExists(rentId: number): Promise<Rental> {
        const rental = await prismaClient.rental.findFirst({
            where:{
                id: rentId,
            }
        });

        if(!rental){
            throw new ResponseError(404, "Rental not found");
        }

        return rental;
    }

    static async get(id: number): Promise<Rental> {
        const rental = await this.checkUnitMustExists(id);
        return rental;
    }

    static async remove(id: number) : Promise<RentalResponse> {
        await this.checkUnitMustExists(id);

        const rental = await prismaClient.rental.delete({
            where: {
                id: id,
            }
        });

        return toRentalResponse(rental);
    }
}