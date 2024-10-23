import { Unit } from "@prisma/client";
import { prismaClient } from "../application/database";
import { CreateUnitRequest, UnitResponse, UpdateUnitRequest, toUnitResponse, SearchUnitRequest } from "../model/unit-model"
import { Validation } from "../validation/validation";
import { UnitValidation } from "../validation/unit-validation";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";


export class UnitService {
    static async create(request: CreateUnitRequest): Promise<UnitResponse> {
        const createRequest = Validation.validate(UnitValidation.CREATE, request);

        const unit = await prismaClient.unit.create({
            data: createRequest
        });

        return toUnitResponse(unit);
    }

    static async checkUnitMustExists(unitId: number): Promise<Unit> {
        const unit = await prismaClient.unit.findFirst({
            where:{
                id: unitId,
            }
        });

        if(!unit){
            throw new ResponseError(404, "Unit not found");
        }

        return unit;
    }

    static async getAll(): Promise<Unit[]> {
        const unit = await prismaClient.unit.findMany();

        if(!unit){
            throw new ResponseError(404, "Unit not found");
        }

        return unit;
    }

    static async get(id: number): Promise<UnitResponse> {
        const contact = await this.checkUnitMustExists(id);
        return toUnitResponse(contact);
    }

    static async update(request: UpdateUnitRequest) : Promise<UnitResponse> {
        const updateRequest = Validation.validate(UnitValidation.UPDATE, request);
        await this.checkUnitMustExists(updateRequest.id);

        const unit = await prismaClient.unit.update({
            where: {
                id: updateRequest.id,
            },
            data: updateRequest
        });

        return toUnitResponse(unit);
    }

    static async remove(id: number) : Promise<UnitResponse> {
        await this.checkUnitMustExists(id);

        const contact = await prismaClient.unit.delete({
            where: {
                id: id,
            }
        });

        return toUnitResponse(contact);
    }

    static async search(request: SearchUnitRequest) : Promise<Pageable<UnitResponse>> {
        const searchRequest = Validation.validate(UnitValidation.SEARCH, request);
        const skip = (searchRequest.page - 1) * searchRequest.size;

        const filters = [];
        // check if name exists
        if(searchRequest.name){
            filters.push({
                OR: [
                    {
                        name: {
                            contains: searchRequest.name
                        }
                    }
                ]
            })
        }

        const contacts = await prismaClient.unit.findMany({
            where: {
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        });

        const total = await prismaClient.unit.count({
            where: {
                AND: filters
            },
        })

        return {
            data: contacts.map(contact => toUnitResponse(contact)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size),
                size: searchRequest.size
            }
        }
    }
}