import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const handleValidationErrors: any = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const firstError = errors.array()[0];

        return res.status(400).json({
            error_code: "INVALID_DATA",
            error_description: firstError.msg,
        });
    }

    next();
};
