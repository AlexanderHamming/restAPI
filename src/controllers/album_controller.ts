import {Request, Response} from "express"
import Debug from "debug"
import { albumId, createAlbum, updateAlbum } from "../types/album_types"
import { CreateAlbum, GetAlbums, GetAlbum, patchAlbum, photoToAlbum } from "../services/album_services"
import { userId } from "../types/user_types";


const debug = Debug("album_controller");

export const index = async (req: Request, res: Response) => {
	try {
		const {userId} = req.params;
		const albums = await GetAlbums(Number(userId));
		res.send({Status: "Succes", Data: albums });

	} catch (err) {
		console.error(err)
		res.status(500).send({status: "error", message: "There was an issue encountered while attempting to query the database"})
	}
}


export const show = async (req: Request, res: Response) => {
	try {
	const {userId, albumId} = req.params;
	const album = await GetAlbum(Number(userId), Number(albumId));
	res.send({Status: "Succes", Data: album });

	} catch (err: any) {
		if (err.code === "P2025") {
			res.status(404).send({ status: "error", message: "Album Not Found" });
		} else {
		console.error(err)
		res.status(500).send({status: "error", message: "There was an issue encountered while attempting to query the database"})
	}
}
}



export const store = async (req: Request, res: Response) => {

	const data = req.body as createAlbum;
	const userId = data.userId;

	try {
        const album = await CreateAlbum(userId, data);
		res.status(201).send({Status: "Succes", data: album})
	} catch (err) {
		console.error(err);
		res.status(500).send({status: "error", message: "There was an issue encountered while attempting to query the database"})
	}

}


export const update = async (req: Request, res: Response) => {

}
