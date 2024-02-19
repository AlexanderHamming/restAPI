import prisma from "../prisma";
import { createUser, updateUser, userId } from "../types/user_types";

export const CreateUser = async (data: createUser) => {
	return await prisma.user.create({
		data,
	})
}


export const GetUserInfo = async (userId: number) => {
	return prisma.user.findUnique({
		where: { id: userId}
	})
}


export const patchUser = async (userId: number, data: updateUser) => {
	return await prisma.user.update({
		where: { id: userId },
		data,
	});
}

export const getUserByEmail = async (email: string) => {
    return await prisma.user.findFirst({
        where: {
            email: { equals: email },
        },
    });
}


export const getUserById = async (id: number) => {
	return await prisma.user.findUnique({
		where: {
			id,
		},
	})
}

