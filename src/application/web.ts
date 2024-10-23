import express, {Request} from "express";
import { errorMiddleware } from "../middleware/error-middleware";
import { publicRouter } from "../route/public-api";
import { apiRouter } from "../route/api";
import cookieParser from 'cookie-parser';
import cors from "cors";

export const web = express();
web.use(cors<Request>());
web.use(express.json());
web.use(cookieParser());
web.use(publicRouter);
web.use(apiRouter);
web.use(errorMiddleware);