import debug from "debug";
import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { CreateUser, getUserByEmail, getUserById } from "../services/user_services";
import { createUser } from "../types/user_types";
import { extractValidateHeader } from "../middlewares/auth/auth_helper";
import bcrypt from "bcrypt"


export const register = async (req: Request, res: Response) => {
	try {
	const validatedData = matchedData(req) as createUser;

	const hashedPassword = await bcrypt.hash(validatedData.password, 10);

	validatedData.password = hashedPassword;

	const user = await CreateUser(validatedData)

	res.status(201).send({Status: "Sucess", Data: user })
	} catch (err: any){
		res.status(500).send({Status: "Error", message: "Couldn't create the user"})

	}
}

