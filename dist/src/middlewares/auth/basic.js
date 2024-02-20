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
exports.basic = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const debug_1 = __importDefault(require("debug"));
const user_services_1 = require("../../services/user_services");
const auth_helper_1 = require("./auth_helper");
const debug = (0, debug_1.default)("auth-basic");
debug.enabled = true;
const basic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let base64Payload;
    try {
        base64Payload = (0, auth_helper_1.extractValidateHeader)(req, "Basic");
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(401).send({ status: "fail", message: err.message });
        }
        return res.status(401).send({ status: "fail", message: "Unknown authorization error" });
    }
    const decodedPayload = Buffer.from(base64Payload, "base64").toString("ascii");
    const [email, password] = decodedPayload.split(":");
    debug("Email: %s", email);
    debug("Password: %s", password);
    if (!email || !password) {
        debug("User did not send email or password");
        return res.status(401).send({ status: "fail", message: "Authorization required" });
    }
    const user = yield (0, user_services_1.getUserByEmail)(email);
    if (!user) {
        debug("User %s does not exist", email);
        return res.status(401).send({ status: "fail", message: "Authorization required" });
    }
    debug(" User did exist: %O", user);
    const password_correct = yield bcrypt_1.default.compare(password, user.password);
    if (!password_correct) {
        debug("Password for user %s was not correct", email);
        return res.status(401).send({ status: "fail", message: "Authorization required" });
    }
    debug("Password for user %s was correct", email);
    req.user = user;
    next();
});
exports.basic = basic;
