
import express from "express";
import { index, show, store, update, destroy } from "../controllers/_controller";
import { getProfile } from "../controllers/profile_controller";
const router = express.Router();

/**
 * GET /resources
 *
 * Get all resources
 */
router.get("/", getProfile);

/**
 * GET /resources/:resourceId
 *
 * Get a single resource
 */
router.get("/:resourceId", show);

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
router.patch("/:resourceId", update);

export default router;
