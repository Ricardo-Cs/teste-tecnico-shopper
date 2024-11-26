import { body } from "express-validator";

export const rideEstimateValidator = [
    body("customer_id")
        .notEmpty().withMessage("O ID do usuário é obrigatório.")
        .isUUID().withMessage("O ID não é válido."),
    body("origin").notEmpty().withMessage("O endereço de origem não pode estar vazio."),
    body("destination").notEmpty().withMessage("O endereço de destino não pode estar vazio.")
        .custom((destination, { req }) => {
            if (destination === req.body.origin) {
                throw new Error("O endereço de origem e destino não podem ser iguais.");
            }
            return true;
        }),
];
