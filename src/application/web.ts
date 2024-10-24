import express, {Request} from "express";
import { errorMiddleware } from "../middleware/error-middleware";
import { publicRouter } from "../route/public-api";
import { apiRouter } from "../route/api";
import cookieParser from 'cookie-parser';
import cors from "cors";

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true, 
    exposedHeaders: ["Set-cookie"]
};
  
export const web = express();
web.use(cookieParser());
web.use(cors(corsOptions));
web.use(express.json());
web.use(publicRouter);
web.use(apiRouter);
web.use(errorMiddleware);