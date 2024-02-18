import prisma from "../prisma";
import { createAlbum, updateAlbum, albumId } from "../types/album_types";



export const CreateAlbum = async (userId:  number, data: createAlbum ) => {
	return await prisma.album.create({
		data: {
			...data,
			userId,
		},
	});
}

export const GetAlbums = async (userId: number) => {
return await prisma.album.findMany({
    where: {
      userId,
    },
  });
}

export const GetAlbum = async (userId: number, albumId: number) => {
return await prisma.album.findUniqueOrThrow({
	where: {
		id: albumId,
		userId,
	},
	include: {
		photos: true
	},
});
}

export const patchAlbum = async ({albumId, data}: { albumId: number; data: updateAlbum } ) => {
	return prisma.album.update({
		where: {
			id: albumId,
		},
		data,
	})

}

export const photoToAlbum = async (albumId: number, photoId: number) => {
	return prisma.album.update({
		where: {id: albumId},
		data: {
			photos: {
				connect: {id: photoId}
			}
		}
	})
}
