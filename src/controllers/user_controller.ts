import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { CreateUser } from "../services/user_services";
import { createUser } from "../types/user_types";
import bcrypt from "bcrypt";


export const register = async (req: Request, res: Response) => {
	try {
		const validatedData = matchedData(req) as createUser;


		const hashedPassword = await bcrypt.hash(validatedData.password, 10);

		validatedData.password = hashedPassword;

		const user = await CreateUser(validatedData);

		const { password, id, ...userDataShow } = user;

		res.status(200).send({ status: "success", data: userDataShow});
	} catch (err: any) {
		res.status(500).send({
			status: "error",
			message: "Couldn't create the user",
		});
	}
};
