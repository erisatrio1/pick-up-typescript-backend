import { NextFunction, Response } from "express";
import { UserRequest } from "../type/user-request";
import { CreateRentalRequest, ReturnRental} from "../model/rental-model"
import { logger } from "../application/logging";
import { RentalService } from "../service/rental-service"
import { UserService } from "../service/user-service"
import { ResponseError } from "../error/response-error";

export class RentalController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const dateInput = req.body.due_date;
            const due_date = new Date(dateInput)
            const unitId = Number(req.params.unitId);
            const email = req.email!; 
            const user = await UserService.get(email);

            if (user.rent_number >= 2) {
                throw new ResponseError(403, "Maximum rent is 2 cars!");
            }

            const request: CreateRentalRequest = {
                userId: user.id,
                unitId: unitId,
                due_date: due_date
            };

            await UserService.updateRent(user.id, "Rent");

            const response = await RentalService.rent(request);
            logger.debug("response : " + JSON.stringify(response));
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async getAll(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await RentalService.getAll();
            logger.debug("response : " + JSON.stringify(response));
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const rentId = Number(req.params.rentId)
            const rental = await RentalService.get(rentId)
            const now = new Date();
            const lateDays = Math.max(0, Math.ceil((now.getTime() - rental.due_date.getTime()) / (1000 * 60 * 60 * 24))); // Calculate how many days late
            const totalFine = lateDays * rental.fine_per_day;

            const user = await RentalService.get(rentId);

            await UserService.updateRent(user.userId, "Return");

            const request: ReturnRental = {
                rent_end: now,
                total_fine: totalFine
            };

            const response = await RentalService.returnRent(rental.id, request);
            logger.debug("response : " + JSON.stringify(response));
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async remove(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const rentId = Number(req.params.rentId);
            const response = await RentalService.remove(rentId);
            logger.debug("response : " + JSON.stringify(response));
            res.status(200).json({
                data: "OK"
            });
        } catch (e) {
            next(e);
        }
    }

}