import debug from "debug";
import { Request } from "express";

export const extractValidateHeader = (req: Request, expectedType: "Basic" ) => {
	console.log("Extracting header...");
	if(!req.headers.authorization) {
		debug("Authorization header missing");
		throw Error("Authorization header missing");
	}

	const [autschema, payload] = req.headers.authorization.split(" ");

	if (autschema.toLocaleLowerCase() !== "basic") {
	debug("Authorization schema isn't basic");
	throw new Error("Expected basic authentiaction ")
	}

	return payload;
}
