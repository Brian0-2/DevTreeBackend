import { Router } from "express";
import {body} from 'express-validator'
import { createAccount, login } from "./handlers";
import { handleInputErrors } from "./middleware/validation";

const router = Router();

//Routing
router.post("/auth/register",
    body('handle').notEmpty().withMessage('El handle es requerido.'),
    body('name').notEmpty().withMessage('El nombre es requerido.'),
    body('email').isEmail().withMessage('Email no válido.'),
    body('password').isLength({min: 8}).withMessage('El password es muy corto, minimo 8 caracteres.'),

    handleInputErrors,
    createAccount
);

router.post('/auth/login',
    body('email').isEmail().withMessage('Email no válido.'),
    body('password').notEmpty().withMessage('El password es requerido.'),

    handleInputErrors,
    login
);
export default router;
