"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRules = exports.createUserRules = void 0;
const express_validator_1 = require("express-validator");
exports.createUserRules = [
    (0, express_validator_1.body)("first_name")
        .isString().withMessage("first name has to be a string").bail()
        .notEmpty().withMessage("first name can't be empty").bail()
        .trim().isLength({ min: 3, max: 191 }).withMessage("first name has to be 3-191 characters"),
    (0, express_validator_1.body)("last_name")
        .isString().withMessage("last name has to be a string").bail()
        .notEmpty().withMessage("last name can't be empty").bail()
        .trim().isLength({ min: 3, max: 191 }).withMessage("last name has to be 3-191 characters"),
    (0, express_validator_1.body)("email")
        .trim().isEmail().withMessage("email has to be a valid email").bail(),
    (0, express_validator_1.body)("password")
        .isString().withMessage("password has to be a string").bail()
        .notEmpty().withMessage("password can't be empty").bail()
        .trim().isLength({ min: 5 }).withMessage("password has to atleast 5 characters")
];
exports.updateUserRules = [
    (0, express_validator_1.body)("first_name")
        .optional()
        .isString().withMessage("first name has to be a string").bail()
        .notEmpty().withMessage("first name can't be empty").bail()
        .trim().isLength({ min: 3, max: 191 }).withMessage("first name has to be 3-191 characters"),
    (0, express_validator_1.body)("last_name")
        .optional()
        .isString().withMessage("last name has to be a string").bail()
        .notEmpty().withMessage("last name can't be empty").bail()
        .trim().isLength({ min: 3, max: 191 }).withMessage("last name has to be 3-191 characters"),
    (0, express_validator_1.body)("email")
        .optional()
        .trim().isEmail().withMessage("email has to be a valid email").bail(),
    (0, express_validator_1.body)("password")
        .optional()
        .isString().withMessage("password has to be a string").bail()
        .notEmpty().withMessage("password can't be empty").bail()
        .trim().isLength({ min: 5 }).withMessage("password has to atleast 5 characters")
];
