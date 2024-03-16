import prisma from "../prisma";
import { createPhoto, updatePhoto } from "../types/photo_types";

export const CreatePhoto = async (userId: number, data: createPhoto) => {
	return await prisma.photo.create({
		data: {
			...data,
			userId,
		},
	});
};

export const GetPhotos = async (userId: number) => {
	return await prisma.photo.findMany({
		where: {
			userId,
		},
	});
};

export const GetPhoto = async (userId: number, photoId: number) => {
	return await prisma.photo.findUniqueOrThrow({
		where: {
			id: photoId,
			userId,
		},
	});
};

export const patchPhoto = async ({
	userId,
	photoId,
	data,
}: {
	userId: number;
	photoId: number;
	data: updatePhoto;
}) => {
	const photo = await prisma.photo.findUnique({
        where: { id: photoId },
        include: { user: true },
    });
	if (!photo) {
        throw new Error("Album not found");
    }

	if (photo.user.id !== userId) {
        throw new Error("You are not authorized to update this album");
    }

	return prisma.photo.update({
        where: { id: photoId },
        data,
    });
};
