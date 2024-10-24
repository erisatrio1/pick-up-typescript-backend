import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { roleMiddleware } from "../middleware/role-middleware";
import { UserController } from "../controller/user-controller";
import { UnitController } from "../controller/unit-controller";
import { RentalController } from "../controller/rental-controller";
import { asyncMiddleware } from "../helpers/async-middleware";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// User APi
apiRouter.get("/api/users/current", UserController.get);

// Unit API
apiRouter.post("/api/units", UnitController.create);
apiRouter.get("/api/units", UnitController.getAll);
apiRouter.get("/api/units/:unitId(\\d+)", UnitController.get);
apiRouter.put("/api/units/:unitId(\\d+)", UnitController.update);
apiRouter.delete("/api/units/:unitId(\\d+)", UnitController.remove);
apiRouter.get("/api/units/search", UnitController.search);

// Rental API
apiRouter.post("/api/rentals/:unitId", RentalController.create);

apiRouter.use(asyncMiddleware(roleMiddleware));

apiRouter.get("/api/users", UserController.getAll);

apiRouter.get("/api/rentals", RentalController.getAll);
apiRouter.put("/api/rentals/:rentId(\\d+)", RentalController.update);
apiRouter.delete("/api/rentals/:rentId(\\d+)", RentalController.remove);