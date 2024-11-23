import { Router, Request, Response } from "express";
import ride from './ride.routes';

const router = Router();

router.use('/ride', ride)
router.all('*', (req: Request, res: Response) => {
    res.status(404).json('Rota inexistente!');
});

export default router;
