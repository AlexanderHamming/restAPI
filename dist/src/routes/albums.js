"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const album_controller_1 = require("../controllers/album_controller");
const albums_rules_1 = require("../validations/albums_rules");
const validate_req_1 = __importDefault(require("../middlewares/validate_req"));
const basic_1 = require("../middlewares/auth/basic");
const router = express_1.default.Router();
/**
 * GET /resources
 *
 * Get all resources
 */
router.get("/", basic_1.basic, album_controller_1.index);
/**
 * GET /resources/:resourceId
 *
 * Get a single resource
 */
router.get("/:albumId", basic_1.basic, album_controller_1.show);
/**
 * POST /resources
 *
 * Create a resource
 */
router.post("/", albums_rules_1.createAlbumRules, basic_1.basic, validate_req_1.default, album_controller_1.store);
/**
 * PATCH /resources/:resourceId
 *
 * Update a resource
 */
router.patch("/:albumId", albums_rules_1.patchAlbumRules, basic_1.basic, validate_req_1.default, album_controller_1.update);
exports.default = router;
