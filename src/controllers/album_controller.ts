import { Request, Response } from "express";
import Debug from "debug";
import { matchedData, validationResult } from "express-validator";
import { albumId, createAlbum, updateAlbum } from "../types/album_types";
import {
	CreateAlbum,
	GetAlbums,
	GetAlbum,
	patchAlbum,
	photoToAlbum,
} from "../services/album_services";

const debug = Debug("album_controller");

export const index = async (req: Request, res: Response) => {
	try {
		if (!req.user) {
			return res
				.status(401)
				.send({ status: "fail", message: "Authorization required" });
		}
		const userId = req.user.id;
		const albums = await GetAlbums(userId);
		res.send({ status: "success", data: albums });
	} catch (err) {
		console.error(err);
		res.status(500).send({
			status: "error",
			message:
				"There was an issue encountered while attempting to query the database",
		});
	}
};

export const show = async (req: Request, res: Response) => {
	try {
		if (!req.user) {
			return res
				.status(401)
				.send({ status: "fail", message: "Authorization required" });
		}
		const { albumId } = req.params;
		const userId = req.user.id;

		const album = await GetAlbum(Number(userId), Number(albumId));
		const adjustedAlbum = {
			id: album.id,
			title: album.title,
			photos: album.photos || [],
		};

		res.send({ status: "success", data: adjustedAlbum });
	} catch (err: any) {
		if (err.code === "P2025") {
			res.status(404).send({
				status: "error",
				message: "Album Not Found",
			});
		} else {
			console.error(err);
			res.status(500).send({
				status: "error",
				message:
					"There was an issue encountered while attempting to query the database",
			});
		}
	}
};

export const store = async (req: Request, res: Response) => {
	const validatedData = matchedData(req) as createAlbum;

	try {
		const userId = req.user?.id;

		if (!userId) {
			return res
				.status(401)
				.send({ status: "fail", message: "User ID is undefined" });
		}

		const album = await CreateAlbum(userId, validatedData);
		res.status(201).send({ Status: "Success", data: album });
	} catch (err) {
		console.error(err);
		res.status(500).send({
			status: "error",
			message:
				"There was an issue encountered while attempting to query the database",
		});
	}
};

export const update = async (req: Request, res: Response) => {
	const validatedData = matchedData(req) as updateAlbum;

	 try {
        const { albumId } = req.params;
        const userId = (req as any).user?.id;


		if (!userId) {
            return res.status(401).send({ status: "fail", message: "Authorization required" });
        }


		const updatedAlbum = await patchAlbum({
            userId: Number(userId),
            albumId: Number(albumId),
            data: validatedData,
        });


		if (updatedAlbum) {
			res.send({ status: "success", data: updatedAlbum });
		} else {
			res.status(404).send({
				status: "error",
				message: "Album not found",
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).send({
			status: "error",
			message: "Failed to update album",
		});
	}
};

export const addPhotoToAlbum = async (req: Request, res: Response) => {
	const { albumId } = req.params;
	const { id: photoId } = req.body;
	const userId = (req as any).user?.id;

	try {

		if (!userId) {
            return res.status(401).send({ status: "fail", message: "Authorization required" });
        }

		const addedPhoto = await photoToAlbum(Number(userId), Number(albumId), Number(photoId));

		if (addedPhoto) {
			res.send({ status: "success", data: null });
		} else {
			res.status(404).send({
				status: "error",
				message: "Album not found",
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).send({
			status: "error",
			message: "Failed to add photo to album",
		});
	}
};
