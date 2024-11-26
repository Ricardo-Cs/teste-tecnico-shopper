import { body, param, query } from "express-validator";

export const rideListValidator = [
    param('customer_id')
        .notEmpty().withMessage('O id do cliente não pode estar em branco.')
        .isUUID().withMessage('O id do cliente deve ser um UUID válido.'),
    query('driver_id')
        .optional()
        .isUUID().withMessage('O id do motorista deve ser um UUID válido.'),
];
