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
exports.photoToAlbum = exports.patchAlbum = exports.GetAlbum = exports.GetAlbums = exports.CreateAlbum = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const CreateAlbum = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("userId before create:", userId);
    return yield prisma_1.default.album.create({
        data: Object.assign(Object.assign({}, data), { userId }),
    });
});
exports.CreateAlbum = CreateAlbum;
const GetAlbums = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.album.findMany({
        where: {
            userId: userId
        },
    });
});
exports.GetAlbums = GetAlbums;
const GetAlbum = (userId, albumId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.album.findUniqueOrThrow({
        where: {
            userId,
            id: albumId,
        },
        include: {
            photos: true
        },
    });
});
exports.GetAlbum = GetAlbum;
const patchAlbum = ({ albumId, data }) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.album.update({
        where: {
            id: albumId,
        },
        data,
    });
});
exports.patchAlbum = patchAlbum;
const photoToAlbum = (albumId, photoId) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.album.update({
        where: { id: albumId },
        data: {
            photos: {
                connect: { id: photoId }
            }
        }
    });
});
exports.photoToAlbum = photoToAlbum;
