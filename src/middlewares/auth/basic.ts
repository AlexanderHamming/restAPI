import bcrypt from "bcrypt"
import Debug from "debug";
import { Request, Response, NextFunction } from "express";
import { getUserByEmail } from "../../services/user_services";
import { extractValidateHeader } from "./auth_helper";




const debug = Debug("prisma-books:basic");

export const basic = async (req: Request, res: Response, next: NextFunction) => {
	debug("Hello from auth/basic!");

	let base64Payload: string;

	try {
		base64Payload = extractValidateHeader(req, "Basic");
	} catch (err) {
		if (err instanceof Error) {
			return res.status(401).send({ status: "fail", message: err.message });
		}
		return res.status(401).send({ status: "fail", message: "Unknown authorization error" });
	}


	const decodedPayload = Buffer.from(base64Payload, "base64").toString("ascii");



	const [email, password] = decodedPayload.split(":");
	debug("Email: %s", email);
	debug("Password: %s", password);


	if (!email || !password) {
		debug("User did not send email or password");
		return res.status(401).send({ status: "fail", message: "Authorization required" });
	}


	const user = await getUserByEmail(email);
	if (!user) {
		debug("User %s does not exist", email);
		return res.status(401).send({ status: "fail", message: "Authorization required" });
	}


	debug(" User did exist: %O", user);
	const password_correct = await bcrypt.compare(password, user.password);
	if (!password_correct) {
		debug("Password for user %s was not correct", email);
		return res.status(401).send({ status: "fail", message: "Authorization required" });
	}

	debug("Password for user %s was correct 🥳", email);


	(req as any).user = user;


	next();
}



