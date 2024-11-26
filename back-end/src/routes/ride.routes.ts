import { Request, Response, NextFunction, Router } from "express";
import { RideController } from "../controllers/rideController";
import { RideService } from "../services/ride.service";
import { rideEstimateValidator } from "../common/validators/rideEstimateValidator";
import { handleValidationErrors } from "../common/validators/handleValidators";

const router = Router();
const rideController = new RideController(new RideService());

router.post(
    '/estimate',
    rideEstimateValidator,
    handleValidationErrors,
    (req: Request, res: Response, next: NextFunction) => {
        rideController.rideEstimate(req, res, next);
    }
);


router.patch('/confirm', (req, res) => {
    rideController.rideConfirm(req, res);
});

router.get('/:customer_id', (req, res) => {
    rideController.getUserRides(req, res);
});

export default router;