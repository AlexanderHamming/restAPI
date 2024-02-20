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
exports.patchPhoto = exports.GetPhoto = exports.GetPhotos = exports.CreatePhoto = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const CreatePhoto = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.photo.create({
        data: Object.assign(Object.assign({}, data), { userId }),
    });
});
exports.CreatePhoto = CreatePhoto;
const GetPhotos = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.photo.findMany({
        where: {
            userId,
        },
    });
});
exports.GetPhotos = GetPhotos;
const GetPhoto = (userId, photoId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.photo.findUniqueOrThrow({
        where: {
            id: photoId,
            userId,
        },
    });
});
exports.GetPhoto = GetPhoto;
const patchPhoto = ({ photoId, data }) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.photo.update({
        where: {
            id: photoId,
        },
        data,
    });
});
exports.patchPhoto = patchPhoto;
