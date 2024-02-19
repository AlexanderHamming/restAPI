/**
 * Main application routes
 */
import express from "express";
import albumRoutes from "./albums";
import photosRoutes from "./photos";
import profileRoutes from "./profile";
import { createUserRules } from "../validations/user_rules";
import { register } from "../controllers/user_controller";
import { basic } from "../middlewares/auth/basic";
import validateRequest from "../middlewares/validate_req";
const router = express.Router();

/**
 * GET /
 */
router.get("/", (req, res) => {
	res.send({
		message: "Welcome mate",
	});
});

router.use("/albums", albumRoutes )


router.use("/photos", photosRoutes)


router.use("/profile", profileRoutes)


router.post("login", )

router.post("/register", createUserRules, validateRequest, register )




/**
 * Catch-all route handler
 */
router.use((req, res) => {
	// Respond with 404 and a message in JSON-format
	res.status(404).send({
		message: "Not Found",
	});
});

export default router;
