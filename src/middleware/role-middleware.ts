import {Request, Response, NextFunction} from "express";
import {UserRequest} from "../type/user-request";
import jwt from "jsonwebtoken";
import { env } from "../config/config";
import { UserService } from "../service/user-service";

// const verifyToken = (token: string, secret: string): Promise<any> => {
//     return new Promise((resolve, reject) => {
//         jwt.verify(token, secret, (err, decoded) => {
//             if (err) {
//                 return reject(err);
//             }
//             resolve(decoded);
//         });
//     });
// };

// export const roleMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({
//             errors: "Unauthorized"
//         }).end();
//     }

//     try {
//         const decoded = await verifyToken(token, env.ACCESS_TOKEN_SECRET);
        
//         if (decoded && typeof decoded === 'object' && 'email' in decoded) {
//             req.email = (decoded as { email: string }).email;

//             const user = await UserService.get(req.email);

//             if (user.role !== 'Admin') {
//                 return res.sendStatus(403).end();
//             } else {
//                 return next();
//             }

//         } else {
//             return res.sendStatus(403).end();
//         }

//     } catch (err) {
//         return res.sendStatus(403).end();
//     }
// }


export const roleMiddleware = async (req: UserRequest, res: Response, next: NextFunction)=> {
    try {
        const user = await UserService.get(req.email!);
        if (!user || user.role !== 'Admin') {
            return res.status(403).json({
                message: "Forbidden: You don't have the necessary permissions."
            });
        }
        next(); 
    } catch (err) {
        next(err); 
    }
};