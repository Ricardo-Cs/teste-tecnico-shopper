import { Router } from "express";
import { RideController } from "../controllers/rideController";

const router = Router();
const rideController = new RideController();

router.post('/estimate', (req, res) => {
    rideController.rideEstimate(req, res);
});

router.patch('/confirm', (req, res) => {
    rideController.rideConfirm(req, res);
});

router.get('/:customer_id', (req, res) => {
    rideController.getUserRides(req, res);
});

export default router;