import { body } from "express-validator";

 export const createAlbumRules = [
	body("title").isString().withMessage("title has to be a string").bail()
	.notEmpty().withMessage("title can't be empty").bail()
	.trim().isLength({min: 3, max:191 }).withMessage("title has to be 3-191 characters")
 ]

 export const patchAlbumRules = [
	body("title").isString().withMessage("title has to be a string").bail()
	.notEmpty().withMessage("title can't be empty").bail()
	.trim().isLength({min: 3, max:191 }).withMessage("title has to be 3-191 characters")
 ]
