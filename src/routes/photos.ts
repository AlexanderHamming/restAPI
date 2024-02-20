
import express from "express";
import { index, show, store, update } from "../controllers/photo_controller";
import { createPhotoRules, updatePhotoRules } from "../validations/photos_rules";
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
router.get("/:photoId", basic, show);

/**
 * POST /resources
 *
 * Create a resource
 */
router.post("/", createPhotoRules, basic, validateRequest, store);

/**
 * PATCH /resources/:resourceId
 *
 * Update a resource
 */
router.patch("/:photoId", updatePhotoRules, basic, validateRequest, update);

export default router;
