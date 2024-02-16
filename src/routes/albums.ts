import express from "express";
import { index, show, store, update } from "../controllers/album_controller";
const router = express.Router();

/**
 * GET /resources
 *
 * Get all resources
 */
router.get("/", index);

/**
 * GET /resources/:resourceId
 *
 * Get a single resource
 */
router.get("/:albumId", show);

/**
 * POST /resources
 *
 * Create a resource
 */
router.post("/", store);

/**
 * PATCH /resources/:resourceId
 *
 * Update a resource
 */
router.patch("/:albumId", update);


export default router;
