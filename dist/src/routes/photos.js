"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const photo_controller_1 = require("../controllers/photo_controller");
const photos_rules_1 = require("../validations/photos_rules");
const validate_req_1 = __importDefault(require("../middlewares/validate_req"));
const basic_1 = require("../middlewares/auth/basic");
const router = express_1.default.Router();
/**
 * GET /resources
 *
 * Get all resources
 */
router.get("/", basic_1.basic, photo_controller_1.index);
/**
 * GET /resources/:resourceId
 *
 * Get a single resource
 */
router.get("/:photoId", basic_1.basic, photo_controller_1.show);
/**
 * POST /resources
 *
 * Create a resource
 */
router.post("/", photos_rules_1.createPhotoRules, basic_1.basic, validate_req_1.default, photo_controller_1.store);
/**
 * PATCH /resources/:resourceId
 *
 * Update a resource
 */
router.patch("/:photoId", photos_rules_1.updatePhotoRules, basic_1.basic, validate_req_1.default, photo_controller_1.update);
exports.default = router;
