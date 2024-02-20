"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractValidateHeader = void 0;
const debug_1 = __importDefault(require("debug"));
const extractValidateHeader = (req, expectedType) => {
    console.log("Extracting header...");
    if (!req.headers.authorization) {
        (0, debug_1.default)("Authorization header missing");
        throw Error("Authorization header missing");
    }
    const [autschema, payload] = req.headers.authorization.split(" ");
    if (autschema.toLocaleLowerCase() !== "basic") {
        (0, debug_1.default)("Authorization schema isn't basic");
        throw new Error("Expected basic authentiaction ");
    }
    return payload;
};
exports.extractValidateHeader = extractValidateHeader;
