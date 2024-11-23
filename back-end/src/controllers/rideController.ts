import { Request, Response } from "express";
import { computeRoutes } from "../libs/googleMaps";

export class RideController {
    async rideEstimate(req: Request, res: Response) {
        const data: any = req.body;
        res.json(computeRoutes(data.origin, data.destination));
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