"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchAlbumRules = exports.createAlbumRules = void 0;
const express_validator_1 = require("express-validator");
exports.createAlbumRules = [
    (0, express_validator_1.body)("title").isString().withMessage("title has to be a string").bail()
        .notEmpty().withMessage("title can't be empty").bail()
        .trim().isLength({ min: 3, max: 191 }).withMessage("title has to be 3-191 characters")
];
exports.patchAlbumRules = [
    (0, express_validator_1.body)("title").isString().withMessage("title has to be a string").bail()
        .notEmpty().withMessage("title can't be empty").bail()
        .trim().isLength({ min: 3, max: 191 }).withMessage("title has to be 3-191 characters")
];
