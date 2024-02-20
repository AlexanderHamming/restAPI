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
exports.getProfile = void 0;
const debug_1 = __importDefault(require("debug"));
const user_services_1 = require("../services/user_services");
const debug = (0, debug_1.default)("profile_controller");
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (userId === undefined) {
            throw new Error("User ID is undefiend");
        }
        const user = yield (0, user_services_1.getUserById)(userId);
        res.status(200).send({ Status: "Succes", Data: user });
    }
    catch (err) {
        if (err.code === "P2025") {
            res.status(404).send({
                Status: "Error",
                message: "User not found",
            });
        }
        else {
            debug("Error för o hitta ID %d: %O', req.user?.id, err");
            res.status(500).send({
                Status: "Error",
                message: "Something went wrong when querying the database",
            });
        }
    }
});
exports.getProfile = getProfile;
