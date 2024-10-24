import { NextFunction, Response, Request } from "express";
import { CreateUserRequest, LoginUserRequest } from "../model/user-model";
import { UserService } from "../service/user-service";
import { UserRequest } from "../type/user-request";
import { logger } from "../application/logging";

export class UserController {

    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateUserRequest = req.body as CreateUserRequest;
            const response = await UserService.register(request);
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginUserRequest = req.body as LoginUserRequest;
            const response = await UserService.login(request);
            console.log("Setting cookie:", response.refresh_token);
            
            res.cookie('refresh_token', response.refresh_token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
                secure: false,
                sameSite: 'none'
            })
            console.log('Cookies setelah diatur:', req.cookies);
            
            res.status(200).json({
                success: true,
                access_token: response.access_token,
                refresh_token: response.refresh_token
            })
        } catch (error) {
            next(error);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await UserService.getAll();
            logger.debug("response : " + JSON.stringify(response));
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await UserService.get(req.email!);
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e);
        }
    }

    static async me(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await UserService.get(req.email!);
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e);
        }
    }

    static async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('Cookies:', req);
            const refreshToken = req.cookies.refresh_token; 
            console.log('refresh adalah :', refreshToken);
            
            
            const response = await UserService.refreshToken(refreshToken);

            res.status(200).json({
                success: true,
                access_token: response.access_token
            })
        } catch (e) {
        next(e);
        }
    }


    static async logout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.cookies.refresh_token; 
            
            await UserService.logout(refreshToken);
            
            res.clearCookie('refresh_token');
            res.status(200).json({
                data: "OK"
            })
        } catch (e) {
            next(e);
        }
    }
}