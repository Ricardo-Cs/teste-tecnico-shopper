import { Request, Response } from "express";

export const rideTest = (req: Request, res: Response) => {
    res.json({ Mensagem: "Teste" });
};