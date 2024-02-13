import prisma from "../prisma";
import { createUser, updateUser, userId } from "../types/user_types";

export const CreateUser = async (data: createUser) => {
	return await prisma.user.create({
		data,
	})
}


