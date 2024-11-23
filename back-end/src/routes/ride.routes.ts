import { Router } from "express";
import { rideController } from "../controllers/rideController";

const router = Router();
const RideController = new rideController();

router.post('/estimate', (req, res) => {
    RideController.rideEstimate(req, res);
});

export default router;