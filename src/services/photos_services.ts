import prisma from "../prisma";
import { createPhoto, updatePhoto, photoId } from "../types/photo_types";


export const CreatePhoto = async (data: createPhoto) => {
	return await prisma.photo.create({
		data,
	})
}

export const GetPhotos = async () => {
return await prisma.photo.findMany();
}

export const GetPhoto = async (photoId: number) => {
return await prisma.photo.findUniqueOrThrow({
	where: {
		id: photoId,
	}
})
}

export const patchPhoto = async (photoId: number, data: updatePhoto ) => {
	return prisma.photo.update({
		where: {
			id: photoId,
		},
		data,
	})
}


