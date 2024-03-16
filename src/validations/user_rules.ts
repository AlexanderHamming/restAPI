import { body } from "express-validator";
import { getUserByEmail } from "../services/user_services";


export const createUserRules = [
	body("first_name")
	.isString().withMessage("first name has to be a string").bail()
		.notEmpty().withMessage("first name can't be empty").bail()
		.trim().isLength({min: 3, max:191 }).withMessage("first name has to be 3-191 characters"),

	body("last_name")
	.isString().withMessage("last name has to be a string").bail()
		.notEmpty().withMessage("last name can't be empty").bail()
		.trim().isLength({min: 3, max:191 }).withMessage("last name has to be 3-191 characters"),

	body("email")
        .trim().isEmail().withMessage("email has to be a valid email")
        .custom(async (email) => {
            const existingUser = await getUserByEmail(email);
            if (existingUser) {
                throw new Error("email is already in use");
            }
        }),

body("password")
.isString().withMessage("password has to be a string").bail()
		.notEmpty().withMessage("password can't be empty").bail()
		.trim().isLength({min: 5 }).withMessage("password has to atleast 5 characters")
]


export const updateUserRules = [
	body("first_name")
	.optional()
	.isString().withMessage("first name has to be a string").bail()
		.notEmpty().withMessage("first name can't be empty").bail()
		.trim().isLength({min: 3, max:191 }).withMessage("first name has to be 3-191 characters"),

	body("last_name")
	.optional()
	.isString().withMessage("last name has to be a string").bail()
		.notEmpty().withMessage("last name can't be empty").bail()
		.trim().isLength({min: 3, max:191 }).withMessage("last name has to be 3-191 characters"),

		body("email")
        .trim().isEmail().withMessage("email has to be a valid email")
        .custom(async (email) => {
            const existingUser = await getUserByEmail(email);
            if (existingUser) {
                throw new Error("email is already in use");
            }
        }),

	body("password")
	.optional()
.isString().withMessage("password has to be a string").bail()
		.notEmpty().withMessage("password can't be empty").bail()
		.trim().isLength({min: 5 }).withMessage("password has to atleast 5 characters")


]

