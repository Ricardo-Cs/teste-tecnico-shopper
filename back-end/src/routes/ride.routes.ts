import { Request, Response, NextFunction, Router } from "express";
import { RideController } from "../controllers/rideController";
import { RideService } from "../services/ride.service";
import { rideEstimateValidator } from "../common/validators/rideEstimateValidator";
import { handleValidationErrors } from "../common/validators/handleValidators";
import { rideConfirmValidator } from "../common/validators/rideConfirmValidator";
import { rideListValidator } from "../common/validators/rideListValidator";

const router = Router();
const rideController = new RideController(new RideService());

router.post('/estimate', rideEstimateValidator, handleValidationErrors, (req: Request, res: Response, next: NextFunction) => {
    rideController.rideEstimate(req, res, next);
});

router.patch('/confirm', rideConfirmValidator, handleValidationErrors, (req: Request, res: Response) => {
    rideController.rideConfirm(req, res);
});

router.get('/:customer_id', rideListValidator, handleValidationErrors, (req: Request, res: Response) => {
    rideController.getUserRides(req, res);
});

export default router;