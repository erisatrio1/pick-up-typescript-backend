import { Request, NextFunction, Response } from "express";
import { CreateUnitRequest, UnitResponse, UpdateUnitRequest, toUnitResponse, SearchUnitRequest } from "../model/unit-model"
import { logger } from "../application/logging";
import { UnitService } from "../service/unit-service"

export class UnitController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateUnitRequest = req.body as CreateUnitRequest;
            const response = await UnitService.create(request);
            logger.debug("response : " + JSON.stringify(response));
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await UnitService.getAll();
            logger.debug("response : " + JSON.stringify(response));
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const unitId = Number(req.params.unitId);
            const response = await UnitService.get(unitId);
            logger.debug("response : " + JSON.stringify(response));
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const request: UpdateUnitRequest = req.body as UpdateUnitRequest;
            request.id = Number(req.params.unitId);

            const response = await UnitService.update(request);
            logger.debug("response : " + JSON.stringify(response));
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const unitId = Number(req.params.unitId);
            const response = await UnitService.remove(unitId);
            logger.debug("response : " + JSON.stringify(response));
            res.status(200).json({
                data: "OK"
            });
        } catch (e) {
            next(e);
        }
    }

    static async search(req: Request, res: Response, next: NextFunction) {
        try {
            const request: SearchUnitRequest = {
                name: req.query.name as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await UnitService.search(request);
            logger.debug("response : " + JSON.stringify(response));
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}