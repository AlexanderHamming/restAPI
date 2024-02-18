import {Request, Response} from "express"
import Debug from "debug"
import { CreatePhoto,GetPhoto, GetPhotos,patchPhoto } from "../services/photos_services"
import { createPhoto,updatePhoto } from "../types/photo_types"
import { matchedData, validationResult } from "express-validator"

export const index = async (req: Request, res: Response) => {

	const {userId} = req.params;

	try {

		const photos = await GetPhotos(Number(userId));
		res.send({Status: "Succes", Data: photos });

	} catch (err) {
		console.error(err)
		res.status(500).send({status: "error", message: "There was an issue encountered while attempting to query the database"})
	}
}


export const show = async (req: Request, res: Response) => {

	const {userId, albumId} = req.params;

	try {

		const photo = await GetPhoto(Number(userId), Number(albumId));

	res.send({Status: "Succes", Data: photo });

	} catch (err: any) {
		if (err.code === "P2025") {
			res.status(404).send({ status: "error", message: "Photo Not Found" });
		} else {
		console.error(err)
		res.status(500).send({status: "error", message: "There was an issue encountered while attempting to query the database"})
	}
}
}



export const store = async (req: Request, res: Response) => {

	const validatedData = matchedData(req) as createPhoto;

	try {

        const userId = validatedData.userId;
		const photo = await CreatePhoto(userId, validatedData)
		res.status(201).send({Status: "Success", data: photo})
	} catch (err) {
		console.error(err);
		res.status(500).send({status: "error", message: "There was an issue encountered while attempting to query the database"})
	}

}




export const update = async (req: Request, res: Response) => {

	const { userId, photoId } = req.params;
	try {
	  const validatedData = matchedData(req) as updatePhoto;

	  const updatedPhoto = await patchPhoto(Number(userId), Number(photoId), validatedData);

	  if (updatedPhoto) {
		res.send({ Status: "Success", data: updatedPhoto });
	  } else {
		res.status(404).send({ Status: "Error", Message: "Photo not found" });
	  }
	} catch (err) {
	  console.error(err);
	  res.status(500).send({ Status: "Error", Message: "Failed to update photo" });
	}
  };
