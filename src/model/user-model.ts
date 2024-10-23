import { User } from "@prisma/client";

export type UserResponse = {
    id: number;
    name: string;
    email: string
    role?: string | null
    access_token?: string;
    refresh_token?: string | null;
    rent_number: number

}

export type CreateUserRequest = {
    name: string;
    email: string
    password: string;
    confPassword: string;
}

export type LoginUserRequest = {
    email: string;
    password: string;
}

export function toUserResponse(user: User) : UserResponse {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        rent_number: user.rent_number
    }
}

export function toUserResponseLogin(user: User, access_token: string) : UserResponse {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        refresh_token: user.refresh_token,
        access_token: access_token,
        rent_number: user.rent_number
    }
}