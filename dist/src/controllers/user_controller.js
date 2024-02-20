"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const express_validator_1 = require("express-validator");
const user_services_1 = require("../services/user_services");
const bcrypt_1 = __importDefault(require("bcrypt"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = (0, express_validator_1.matchedData)(req);
        const hashedPassword = yield bcrypt_1.default.hash(validatedData.password, 10);
        validatedData.password = hashedPassword;
        const user = yield (0, user_services_1.CreateUser)(validatedData);
        res.status(201).send({ Status: "Sucess", Data: user });
    }
    catch (err) {
        res.status(500).send({
            Status: "Error",
            message: "Couldn't create the user",
        });
    }
});
exports.register = register;
