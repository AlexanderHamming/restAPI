import bcrypt from 'bcrypt';
import Debug from 'debug';
import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { patchUser, getUserById } from '../services/user_services';
import { updateUser } from '../types/user_types';

const debug = Debug('profile_controller');

export const getProfile = async (req: Request, res: Response) => {
	try {
		const userId = req.user?.id

		if (userId === undefined) {
			throw new Error("User ID is undefiend");
		}

	const user = await getUserById(userId);
	res.status(200).send({Status: "Succes", Data: user})
	} catch (err: any){
      if (err.code === "P2025") {
		res.status(404).send({ Status: "Error", message: "User not found"})
	  } else {
		debug("Error för o hitta ID %d: %O', req.user?.id, err")
		res.status(500).send({ Status: "Error", message: "Something went wrong when querying the database"})
	  }
	}
}


  export const updateProfile = async (req: Request, res: Response) => {
	const userId = req.user?.id;

	if (userId === undefined) {
		return res.status(400).send({ status: 'error', message: 'User ID is undefined' })
	}

	const validatedData = matchedData(req) as updateUser;

	if (validatedData.password) {
		validatedData.password = await bcrypt.hash(validatedData.password, Number(process.env.SALT_ROUNDS) || 10);
	  }
	try {
	  const user = await patchUser(userId, validatedData);
	  res.status(200).send({ status: 'success', data: user });
	} catch (err: any){
		if (err.code === "P2025") {
		  res.status(404).send({ Status: "Error", message: "User not found"})
		} else {
		  debug("Error för o hitta ID %d: %O', req.user?.id, err")
		  res.status(500).send({ Status: "Error", message: "Something went wrong when querying the database"})
	  }
	}
  };





