import { Request, Response, NextFunction } from "express";
import { rideEstimateRequest } from "../common/types/ride.types";
import { RideService } from "../services/ride.service";

export class RideController {
    private rideService: RideService;

    constructor(rideService: RideService) {
        this.rideService = rideService;
    }

    async rideEstimate(req: Request, res: Response, next: NextFunction) {
        const data: rideEstimateRequest = {
            customer_id: req.body.customer_id,
            origin: req.body.origin,
            destination: req.body.destination
        };

        const result = await this.rideService.rideEstimate(data);
        res.status(result.status).json(result.response);
    };

    async rideConfirm(req: Request, res: Response) {
        res.json("Certo");
    }

    async getUserRides(req: Request, res: Response) {
        const customer_id = req.params.customer_id;
        const driver_id = req.query.driver_id;
        res.json({ customer_id, driver_id });
    }
}