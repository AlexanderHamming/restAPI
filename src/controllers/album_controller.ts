import {Request, Response} from "express"
import Debug from "debug"
import { matchedData, validationResult } from "express-validator"
import { albumId, createAlbum, updateAlbum } from "../types/album_types"
import { CreateAlbum, GetAlbums, GetAlbum, patchAlbum, photoToAlbum } from "../services/album_services"
import { userId } from "../types/user_types";



const debug = Debug("album_controller");

export const index = async (req: Request, res: Response) => {

	try {
		if (!req.user) {
		  return res.status(401).send({ status: 'fail', message: 'Authorization required' });
		}
		const userId = req.user.id;
		const albums = await GetAlbums(userId);
		res.send({ Status: 'Success', Data: albums });
	}
	catch (err) {
		console.error(err)
		res.status(500).send({status: "error", message: "There was an issue encountered while attempting to query the database"})
	}
}


export const show = async (req: Request, res: Response) => {

	try {
		if (!req.user) {
		  return res.status(401).send({ status: 'fail', message: 'Authorization required' });
		}
		const { albumId } = req.params;
		const userId = req.user.id;


		const album = await GetAlbum(Number(userId), Number(albumId));
		const adjustedAlbum = {
            id: album.id,
            title: album.title,
            photos: album.photos || []
        };

		res.send({ Status: 'Success', Data: adjustedAlbum });
	}catch (err: any) {
		if (err.code === "P2025") {
			res.status(404).send({ status: "error", message: "Album Not Found" });
		} else {
		console.error(err)
		res.status(500).send({status: "error", message: "There was an issue encountered while attempting to query the database"})
	}
}
}



export const store = async (req: Request, res: Response) => {

	const validatedData = matchedData(req) as createAlbum

	try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).send({ status: 'fail', message: 'User ID is undefined' });
        }

		const album = await CreateAlbum(userId, validatedData)
		res.status(201).send({Status: "Success", data: album})
	} catch (err) {
		console.error(err);
		res.status(500).send({status: "error", message: "There was an issue encountered while attempting to query the database"})
	}

}


export const update = async (req: Request, res: Response) => {

	const validatedData = matchedData(req) as updateAlbum;

	try {
		const { albumId } = req.params;
		const userId = req.user?.id;
	  const updatedAlbum = await patchAlbum({ albumId: Number(albumId), data: validatedData });

	  if (updatedAlbum) {
		res.send({ Status: "Success", data: updatedAlbum });
	  } else {
		res.status(404).send({ Status: "Error", Message: "Album not found" });
	  }
	} catch (err) {
	  console.error(err);
	  res.status(500).send({ Status: "Error", Message: "Failed to update album" });
	}
  };




export const addPhotoToAlbum = async (req: Request, res: Response) => {

	const {albumId, photoId} = req.params

	try {

		const addedPhoto = await photoToAlbum(Number(albumId), Number(photoId))

		if(addedPhoto) {
			res.send({ Status: "Succes", data: addedPhoto });
		} else {
			res.status(404).send({Status: "Error", Message: "Album not found"});
		}
	} catch (err) {
		console.error(err);
		res.status(500).send({ Status: "Error", Message: "Failed to update album" });
	  }
	};
