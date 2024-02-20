"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePhotoRules = exports.createPhotoRules = void 0;
const express_validator_1 = require("express-validator");
exports.createPhotoRules = [
    (0, express_validator_1.body)("title").isString().withMessage("title has to be a string").bail()
        .notEmpty().withMessage("title can't be empty").bail()
        .trim().isLength({ min: 3, max: 191 }).withMessage("title has to be 3-191 characters"),
    (0, express_validator_1.body)("url").isString().withMessage("url has to be a string").bail()
        .notEmpty().withMessage("url can't be empty").bail()
        .trim().isLength({ min: 3, max: 191 }).withMessage("url has to be 3-191 characters"),
    (0, express_validator_1.body)("comment").optional().isString().withMessage("comment has to be a string").bail()
        .notEmpty().withMessage("comment can't be empty").bail()
        .trim().isLength({ min: 3, max: 191 }).withMessage("comment has to be 3-191 characters")
];
exports.updatePhotoRules = [
    (0, express_validator_1.body)("title").isString().withMessage("title has to be a string").bail()
        .notEmpty().withMessage("title can't be empty").bail()
        .trim().isLength({ min: 3, max: 191 }).withMessage("title has to be 3-191 characters"),
    (0, express_validator_1.body)("url").isString().withMessage("url has to be a string").bail()
        .notEmpty().withMessage("url can't be empty").bail()
        .trim().isLength({ min: 3, max: 191 }).withMessage("url has to be 3-191 characters"),
    (0, express_validator_1.body)("comment").optional().isString().withMessage("comment has to be a string").bail()
        .notEmpty().withMessage("comment can't be empty").bail()
        .trim().isLength({ min: 3, max: 191 }).withMessage("comment has to be 3-191 characters")
];
