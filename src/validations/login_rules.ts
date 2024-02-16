import { body } from "express-validator";

export const loginRules = [
	body("email")
	.trim().isEmail().withMessage("email has to be a valid email").bail(),

	body("password")
	.isString().withMessage("password has to be a string").bail()
		.notEmpty().withMessage("password can't be empty").bail()

]
