import { body, param, query } from "express-validator";

export const rideListValidator = [
    param('customer_id')
        .notEmpty().withMessage('O id do cliente não pode estar em branco.')
        .isString().withMessage("O ID do usuário deve ser um texto."),
    query('driver_id')
        .optional()
        .isString().withMessage('O id do motorista deve ser um UUID válido.'),
];
