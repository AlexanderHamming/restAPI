"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRules = void 0;
const express_validator_1 = require("express-validator");
exports.loginRules = [
    (0, express_validator_1.body)("email")
        .trim().isEmail().withMessage("email has to be a valid email").bail(),
    (0, express_validator_1.body)("password")
        .isString().withMessage("password has to be a string").bail()
        .notEmpty().withMessage("password can't be empty").bail()
];
