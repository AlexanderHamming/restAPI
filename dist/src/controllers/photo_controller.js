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
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.store = exports.show = exports.index = void 0;
const photos_services_1 = require("../services/photos_services");
const express_validator_1 = require("express-validator");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res
                .status(401)
                .send({ status: "fail", message: "Authorization required" });
        }
        const userId = req.user.id;
        const photos = yield (0, photos_services_1.GetPhotos)(userId);
        res.send({ Status: "Success", Data: photos });
    }
    catch (err) {
        console.error(err);
        res.status(500).send({
            status: "error",
            message: "There was an issue encountered while attempting to query the database",
        });
    }
});
exports.index = index;
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res
                .status(401)
                .send({ status: "fail", message: "Authorization required" });
        }
        const { photoId } = req.params;
        const userId = req.user.id;
        const photo = yield (0, photos_services_1.GetPhoto)(Number(userId), Number(photoId));
        const adjustedPhoto = {
            id: photo.id,
            title: photo.title,
            url: photo.url,
            comment: photo.title,
        };
        res.send({ Status: "Success", Data: adjustedPhoto });
    }
    catch (err) {
        if (err.code === "P2025") {
            res.status(404).send({
                status: "error",
                message: "Photo Not Found",
            });
        }
        else {
            console.error(err);
            res.status(500).send({
                status: "error",
                message: "There was an issue encountered while attempting to query the database",
            });
        }
    }
});
exports.show = show;
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("Incoming request data:", req.body);
    const validatedData = (0, express_validator_1.matchedData)(req);
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res
                .status(401)
                .send({ status: "fail", message: "User ID is undefined" });
        }
        const photo = yield (0, photos_services_1.CreatePhoto)(userId, validatedData);
        res.status(201).send({ Status: "Success", data: photo });
    }
    catch (err) {
        console.error(err);
        res.status(500).send({
            status: "error",
            message: "There was an issue encountered while attempting to query the database",
        });
    }
});
exports.store = store;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const validatedData = (0, express_validator_1.matchedData)(req);
    try {
        const { photoId } = req.params;
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        const updatedPhoto = yield (0, photos_services_1.patchPhoto)({
            photoId: Number(photoId),
            data: validatedData,
        });
        if (updatedPhoto) {
            res.send({ Status: "Success", data: updatedPhoto });
        }
        else {
            res.status(404).send({
                Status: "Error",
                Message: "Photo not found",
            });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send({
            Status: "Error",
            Message: "Failed to update photo",
        });
    }
});
exports.update = update;
