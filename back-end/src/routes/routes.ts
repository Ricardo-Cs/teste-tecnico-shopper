import { Router, Request, Response } from "express";
import { rideTest } from "../controllers/rideController";

const router = Router();

router.get('/ride/', rideTest);

router.all('*', (req: Request, res: Response) => {
    res.status(404).json('Rota inexistente!');
});

export default router;
