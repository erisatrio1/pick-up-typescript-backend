import {Unit} from "@prisma/client";

export type CategoryItems = {
    categoty: string;
}

export type UnitResponse = {
    id: number;
    name: string;
    categories: CategoryItems[];
    price: number;
}

export type CreateUnitRequest = {
    name: string;
    categories: CategoryItems[];
    price: number;
}

export type UpdateUnitRequest = {
    id: number;
    name: string;
    categories: CategoryItems[];
    price: number;
}

export type SearchUnitRequest = {
    name?: string;
    page: number;
    size: number;
}

export function toUnitResponse(unit: Unit): UnitResponse {
    return {
        id: unit.id,
        name: unit.name,
        categories: (unit.categories as unknown as CategoryItems[]) || [],
        price: unit.price
    }
}