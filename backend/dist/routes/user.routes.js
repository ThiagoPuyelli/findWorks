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
router.post("/users/login", user_controllers_1.login);
router.get("/users", user_controllers_1.getUsers);
router.get("/users/:id", user_controllers_1.getUser);
router.delete("/users/:id", user_controllers_1.deleteUser);
router.put("/users/:id", multer_middlewares_1.default.single("image"), user_controllers_1.updateUser);
exports.default = router;
