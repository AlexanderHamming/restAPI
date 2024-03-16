import { body } from "express-validator";

export const createPhotoRules = [
	body("title").isString().withMessage("title has to be a string").bail()
	.notEmpty().withMessage("title can't be empty").bail()
	.trim().isLength({min: 3, max:191 }).withMessage("title has to be 3-191 characters"),

	body("url").isString().withMessage("url has to be a string").bail()
	.notEmpty().withMessage("url can't be empty").bail()
	.trim().isLength({min: 3, max:191 }).withMessage("url has to be 3-191 characters"),

	body("comment").optional().isString().withMessage("comment has to be a string").bail()
	.notEmpty().withMessage("comment can't be empty").bail()
	.trim().isLength({min: 3, max:191 }).withMessage("comment has to be 3-191 characters")
]

export const updatePhotoRules = [

	body("title")
	.optional()
	.isString().withMessage("title has to be a string").bail()
	.notEmpty().withMessage("title can't be empty").bail()
	.trim().isLength({min: 3, max:191 }).withMessage("title has to be 3-191 characters"),

	body("url").
	optional()
	.isString().withMessage("url has to be a string").bail()
	.notEmpty().withMessage("url can't be empty").bail()
	.trim().isLength({min: 3, max:191 }).withMessage("url has to be 3-191 characters"),

	body("comment")
	.optional()
	.isString().withMessage("comment has to be a string").bail()
	.notEmpty().withMessage("comment can't be empty").bail()
	.trim().isLength({min: 3, max:191 }).withMessage("comment has to be 3-191 characters")
]
