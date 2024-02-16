/**
 * Main application routes
 */
import express from "express";
import albumRoutes from "./albums";
import photosRoutes from "./photos";
import profileRoutes from "./profile";
const router = express.Router();

/**
 * GET /
 */
router.get("/", (req, res) => {
	res.send({
		message: "But first, let me take a selfie 🤳 https://www.youtube.com/watch?v=kdemFfbS5H0",
	});
});

/**
 * [EXAMPLE] /resource
 */
// router.use('/resource', resourceRouter);
router.use("/albums", albumRoutes )


router.use("/photos", photosRoutes)


router.use("/profile", profileRoutes)


router.post("login",)

router.post("register",)




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
