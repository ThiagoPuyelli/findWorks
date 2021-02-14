"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const user_controllers_1 = require("../controllers/user.controllers");
const multer_middlewares_1 = __importDefault(require("../middlewares/multer.middlewares"));
router.post("/users/register", multer_middlewares_1.default.single("image"), user_controllers_1.register);
exports.default = router;
