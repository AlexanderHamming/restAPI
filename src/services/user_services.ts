import prisma from "../prisma";
import { createUser } from "../types/user_types";

export const CreateUser = async (data: createUser) => {
	return await prisma.user.create({
		data,
	});
};

export const getUserByEmail = async (email: string) => {
	return await prisma.user.findFirst({
		where: {
			email: { equals: email },
		},
	});
};

export const getUserById = async (userId: number) => {
	return await prisma.user.findUnique({
		where: { id: userId },
		select: {
			id: true,
			email: true,
			first_name: true,
			last_name: true,
		},
	});
};
