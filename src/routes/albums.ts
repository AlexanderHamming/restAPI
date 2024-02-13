import express from "express";
import { index, show, store, update, destroy } from "../controllers/_controller";
const router = express.Router();

router.get("/", index)

