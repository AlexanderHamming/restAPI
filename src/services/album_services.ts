import prisma from "../prisma";
import { createAlbum, updateAlbum } from "../types/album_types";

export const CreateAlbum = async (userId: number, data: createAlbum) => {
	console.log("userId before create:", userId);
	return await prisma.album.create({
		data: {
			...data,
			userId,
		},
	});
};

export const GetAlbums = async (userId: number) => {
	return await prisma.album.findMany({
		where: {
			userId: userId,
		},
	});
};

export const GetAlbum = async (userId: number, albumId: number) => {
	return await prisma.album.findUniqueOrThrow({
		where: {
			userId,
			id: albumId,
		},
		include: {
			photos: true,
		},
	});
};

export const patchAlbum = async ({
	albumId,
	data,
}: {
	albumId: number;
	data: updateAlbum;
}) => {
	return prisma.album.update({
		where: {
			id: albumId,
		},
		data,
	});
};

export const photoToAlbum = async (albumId: number, photoId: number) => {
	return prisma.album.update({
		where: { id: albumId },
		data: {
			photos: {
				connect: { id: photoId },
			},
		},
	});
};
