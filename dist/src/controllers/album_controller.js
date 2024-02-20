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
exports.addPhotoToAlbum = exports.update = exports.store = exports.show = exports.index = void 0;
const debug_1 = __importDefault(require("debug"));
const express_validator_1 = require("express-validator");
const album_services_1 = require("../services/album_services");
const debug = (0, debug_1.default)("album_controller");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res
                .status(401)
                .send({ status: "fail", message: "Authorization required" });
        }
        const userId = req.user.id;
        const albums = yield (0, album_services_1.GetAlbums)(userId);
        res.send({ Status: "Success", Data: albums });
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
        const { albumId } = req.params;
        const userId = req.user.id;
        const album = yield (0, album_services_1.GetAlbum)(Number(userId), Number(albumId));
        const adjustedAlbum = {
            id: album.id,
            title: album.title,
            photos: album.photos || [],
        };
        res.send({ Status: "Success", Data: adjustedAlbum });
    }
    catch (err) {
        if (err.code === "P2025") {
            res.status(404).send({
                status: "error",
                message: "Album Not Found",
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
    const validatedData = (0, express_validator_1.matchedData)(req);
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res
                .status(401)
                .send({ status: "fail", message: "User ID is undefined" });
        }
        const album = yield (0, album_services_1.CreateAlbum)(userId, validatedData);
        res.status(201).send({ Status: "Success", data: album });
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
        const { albumId } = req.params;
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        const updatedAlbum = yield (0, album_services_1.patchAlbum)({
            albumId: Number(albumId),
            data: validatedData,
        });
        if (updatedAlbum) {
            res.send({ Status: "Success", data: updatedAlbum });
        }
        else {
            res.status(404).send({
                Status: "Error",
                Message: "Album not found",
            });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send({
            Status: "Error",
            Message: "Failed to update album",
        });
    }
});
exports.update = update;
const addPhotoToAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { albumId } = req.params;
    const { id: photoId } = req.body;
    try {
        const addedPhoto = yield (0, album_services_1.photoToAlbum)(Number(albumId), Number(photoId));
        if (addedPhoto) {
            res.send({ Status: "Succes", data: null });
        }
        else {
            res.status(404).send({
                Status: "Error",
                Message: "Album not found",
            });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send({
            Status: "Error",
            Message: "Failed to add photo to album",
        });
    }
});
exports.addPhotoToAlbum = addPhotoToAlbum;
