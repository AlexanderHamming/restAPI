import express from "express";
import { index, show, store, update } from "../controllers/album_controller";
import { createAlbumRules, patchAlbumRules } from "../validations/albums_rules";
import validateRequest from "../middlewares/validate_req";
import { basic } from "../middlewares/auth/basic";

const router = express.Router();

/**
 * GET /resources
 *
 * Get all resources
 */
router.get("/", basic, index);

/**
 * GET /resources/:resourceId
 *
 * Get a single resource
 */
router.get("/:albumId", basic, show);

/**
 * POST /resources
 *
 * Create a resource
 */
router.post("/", createAlbumRules, basic, validateRequest, store);

/**
 * PATCH /resources/:resourceId
 *
 * Update a resource
 */
router.patch("/:albumId", patchAlbumRules, basic, validateRequest, update);

export default router;
