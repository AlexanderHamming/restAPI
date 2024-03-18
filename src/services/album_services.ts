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
    userId,
    albumId,
    data,
}: {
    userId: number;
    albumId: number;
    data: updateAlbum;
}) => {

    const album = await prisma.album.findUnique({
        where: { id: albumId },
        include: { user: true },
    });
	if (!album) {
        throw new Error("Album not found");
    }

	if (album.user.id !== userId) {
        throw new Error("You are not authorized to update this album");
    }

	return prisma.album.update({
        where: { id: albumId },
        data,
    });
};



export const photoToAlbum = async (userId: number, albumId: number, photoId: number) => {
    const album = await prisma.album.findUnique({
        where: { id: albumId },
        include: { user: true,},
    });

    if (!album) {
        throw new Error("Album not found");
    }

    if (album.user.id !== userId) {
        throw new Error("You are not authorized to add photos to this album");
    }

	const userPhoto = await prisma.photo.findFirst({
        where: {
            id: photoId,
            userId: userId,
        },
    });

	if (!userPhoto) {
        throw new Error("Photo not found or does not belong to the user");
    }

    return prisma.album.update({
        where: { id: albumId },
        data: {
            photos: {
                connect: { id: photoId },
            },
        },
    });
};
