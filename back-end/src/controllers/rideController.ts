import { Request, Response } from "express";
import { computeRoutes } from "../libs/googleMaps";

export class rideController {
    async rideEstimate(req: Request, res: Response) {
        const data: any = req.body;
        res.json(computeRoutes(data.origin, data.destination));
    };
}