import { body } from "express-validator";

export const rideConfirmValidator = [
    body("customer_id").notEmpty().withMessage("O ID do usuário é obrigatório."),
    body("origin").notEmpty().withMessage("O endereço de origem não pode estar vazio."),
    body("destination").notEmpty().withMessage("O endereço de destino não pode estar vazio.")
        .custom((destination, { req }) => {
            if (destination === req.body.origin) {
                throw new Error("Os endereços de origem e destino não podem ser iguais.");
            }
            return true;
        }),
];
