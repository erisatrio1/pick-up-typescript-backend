import {Request, Response, NextFunction} from "express";
import {UserRequest} from "../type/user-request";
import jwt from "jsonwebtoken";
import { env } from "../config/config";


export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end();
    }

    if (token) {
        jwt.verify(token, env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403).end();
    
            if (decoded && typeof decoded === 'object' && 'email' in decoded) {
                res.header('Access-Control-Allow-Credentials', 'true');
                req.email = (decoded as { email: string }).email;
                
                next();
                return 
            }
    
        })
    }

}