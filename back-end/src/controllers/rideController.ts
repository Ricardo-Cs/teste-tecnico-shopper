import { Request, Response, NextFunction } from "express";
import { rideConfirmRequest, rideEstimateRequest } from "../common/types/ride.types";
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
        const data: rideConfirmRequest = {
            customer_id: req.body.customer_id,
            origin: req.body.origin,
            destination: req.body.destination,
            distance: req.body.distance,
            duration: req.body.duration,
            driver: {
                id: Number(req.body.driver.id),
                name: req.body.driver.name
            },
            value: req.body.value
        };

        const result = await this.rideService.rideConfirm(data);
        res.status(result.status).json(
            {
                error_code: result.error_code,
                error_description: result.error_description,
                success: result.success
            }
        );
    }

    async getUserRides(req: Request, res: Response) {
        const customer_id: string = req.params.customer_id;
        const driver_id: any = req.query.driver_id;

        const result = await this.rideService.userRides(customer_id, Number(driver_id));
        res.status(result.status).json(
            {
                error_code: result.error_code,
                error_description: result.error_description,
                customer_id: customer_id,
                rides: result.rides
            }
        )
    }
}