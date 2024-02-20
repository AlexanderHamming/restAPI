import Debug from "debug";
import { Request, Response } from "express";
import { getUserById } from "../services/user_services";

const debug = Debug("profile_controller");

export const getProfile = async (req: Request, res: Response) => {
	try {
		const userId = req.user?.id;

		if (userId === undefined) {
			throw new Error("User ID is undefiend");
		}

		const user = await getUserById(userId);
		res.status(200).send({ Status: "Succes", Data: user });
	} catch (err: any) {
		if (err.code === "P2025") {
			res.status(404).send({
				Status: "Error",
				message: "User not found",
			});
		} else {
			debug("Error för o hitta ID %d: %O', req.user?.id, err");
			res.status(500).send({
				Status: "Error",
				message: "Something went wrong when querying the database",
			});
		}
	}
};
