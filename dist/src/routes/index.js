"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Main application routes
 */
const express_1 = __importDefault(require("express"));
const albums_1 = __importDefault(require("./albums"));
const photos_1 = __importDefault(require("./photos"));
const user_rules_1 = require("../validations/user_rules");
const user_controller_1 = require("../controllers/user_controller");
const basic_1 = require("../middlewares/auth/basic");
const validate_req_1 = __importDefault(require("../middlewares/validate_req"));
const profile_controller_1 = require("../controllers/profile_controller");
const album_controller_1 = require("../controllers/album_controller");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send({
        message: "Welcome mate",
    });
});
router.use("/albums", albums_1.default);
router.use("/photos", photos_1.default);
router.get("/profile", basic_1.basic, profile_controller_1.getProfile);
router.post("/albums/:albumId/photos", basic_1.basic, validate_req_1.default, album_controller_1.addPhotoToAlbum);
router.post("/register", user_rules_1.createUserRules, validate_req_1.default, user_controller_1.register);
/**
 * Catch-all route handler
 */
router.use((req, res) => {
    // Respond with 404 and a message in JSON-format
    res.status(404).send({
        message: "Not Found",
    });
});
exports.default = router;
