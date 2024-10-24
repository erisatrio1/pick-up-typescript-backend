import bcrypt from 'bcrypt'
import { CreateUserRequest, UserResponse, toUserResponse, LoginUserRequest, toUserResponseLogin } from '../model/user-model';
import { Validation } from '../validation/validation';
import { UserValidation } from '../validation/user-validation';
import { ResponseError } from '../error/response-error';
import { prismaClient } from '../application/database';
import jwt from 'jsonwebtoken'; 
import { env } from '../config/config'
import { User } from '@prisma/client';

export class UserService {
    
    static async register(request : CreateUserRequest) : Promise<UserResponse> {
        
        const registerRequest = Validation.validate(UserValidation.REGISTER, request);
        
        if (request.password !== request.confPassword) {
            throw new ResponseError(400, 'Password and confirm password dont match!')
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

        const user = await prismaClient.user.create({
            data: {
                name: registerRequest.name,
                email: registerRequest.email,
                password: registerRequest.password,
                role: "Anggota"
            }
        })

        return toUserResponse(user);
    }

    static async login(request: LoginUserRequest) : Promise<UserResponse> {

        const loginRequest = Validation.validate(UserValidation.LOGIN,  request);

        let user = await prismaClient.user.findFirst({
            where: {
                email: loginRequest.email
            }
        });

        if (!user) {
            throw new ResponseError(401, "Email or password is wrong");
        }

        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
        if (!isPasswordValid) {
            throw new ResponseError(401, "Email or password is wrong");
        }

        const email = user.email;
        const name = user.name;
        const role = user.role;

        const accessToken = jwt.sign({ name, email, role }, env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({ name, email, role }, env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });


        user = await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                refresh_token: refreshToken
            }
        });

        const response = toUserResponseLogin(user, accessToken!);
        response.refresh_token = refreshToken!;
        response.role = role!;
        return response;
    }

    static async get(email: string ): Promise<UserResponse> {

        let user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new ResponseError(401, "Email or password is wrong");
        }

        return toUserResponse(user);
    }

    static async getAll(): Promise<UserResponse[]> {

        let user = await prismaClient.user.findMany({});

        if (!user) {
            throw new ResponseError(401, "Email or password is wrong");
        }

        return user;
    }

    static async updateRent(id: number, forUse: string ): Promise<UserResponse> {

        let user = await prismaClient.user.findUnique({
            where: {
                id: id
            }
        });

        if (!user) {
            throw new ResponseError(401, "Email or password is wrong");
        }

        if (user.role === "Admin") {
            user.rent_number = 0;
        } else {
            if (forUse === "Rent") {
                if (user.rent_number < 2) {
                    user.rent_number += 1;
                }
            } else {
                user.rent_number = Math.max(0, user.rent_number - 1);
            }
        }


        const update = await prismaClient.user.update({
            where: {
                id: user.id,
            },
            data: {
                rent_number: user.rent_number
            }
        });


        return toUserResponse(update);
    }

    static async logout(refresh_token: string): Promise<UserResponse> {
        
        const user = await prismaClient.user.findFirst({
            where: {
                refresh_token: refresh_token
            }
        });

        if (!user) {
            throw new ResponseError(403, "Not allow access!");
        }

        const result = await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                refresh_token: null
            }
        })


        return toUserResponse(result);
    }

    static async refreshToken(refreshToken: string) : Promise<UserResponse> {

        const user = await prismaClient.user.findFirst({
            where: {
                refresh_token: refreshToken
            }
        });

        if (!user) {
            throw new ResponseError(403, "Not allow access!");
        }


        try {
            const decoded = await new Promise((resolve, reject) => {
                jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(decoded);
                });
            });

            const name = user.name;
            const email = user.email;
            const role = user.role;

            const accessToken = jwt.sign({ name, email, role }, env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            });

            const response = toUserResponseLogin(user, accessToken);
            response.refresh_token = refreshToken!;
            response.role = role!;
            return response;

        } catch (err) {
            throw new ResponseError(403, "Not allowed access!"); 
        }
    }
}