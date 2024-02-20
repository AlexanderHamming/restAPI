import {Request, Response} from "express"
import { CreatePhoto,GetPhoto, GetPhotos,patchPhoto } from "../services/photos_services"
import { createPhoto,updatePhoto } from "../types/photo_types"
import { matchedData, validationResult } from "express-validator"

export const index = async (req: Request, res: Response) => {

	try {
		if (!req.user) {
		  return res.status(401).send({ status: 'fail', message: 'Authorization required' });
		}
		const userId = req.user.id;
		const photos = await GetPhotos(userId);


		res.send({ Status: 'Success', Data: photos });

	} catch (err) {
		console.error(err)
		res.status(500).send({status: "error", message: "There was an issue encountered while attempting to query the database"})
	}
}


export const show = async (req: Request, res: Response) => {

	try {
		if (!req.user) {
		  return res.status(401).send({ status: 'fail', message: 'Authorization required' });
		}
		const { photoId } = req.params;
		const userId = req.user.id;


		const photo = await GetPhoto(Number(userId), Number(photoId));
		const adjustedPhoto = {
			id: photo.id,
            title: photo.title,
			url: photo.url,
            comment: photo.title
        };

		res.send({ Status: 'Success', Data: adjustedPhoto });
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
	console.log('Incoming request data:', req.body);
	const validatedData = matchedData(req) as createPhoto;

	try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).send({ status: 'fail', message: 'User ID is undefined' });
        }

		const photo = await CreatePhoto(userId, validatedData)
		res.status(201).send({Status: "Success", data: photo})
	} catch (err) {
		console.error(err);
		res.status(500).send({status: "error", message: "There was an issue encountered while attempting to query the database"})
	}

}




export const update = async (req: Request, res: Response) => {

	const validatedData = matchedData(req) as updatePhoto;

	try {
		const { photoId } = req.params;
		const userId = req.user?.id;
	  const updatedPhoto = await patchPhoto({ photoId: Number(photoId), data: validatedData });

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
