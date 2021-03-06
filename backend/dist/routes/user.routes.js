"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const user_controllers_1 = require("../controllers/user.controllers");
const consult_controllers_1 = require("../controllers/consult.controllers");
const verifyTokenUser_1 = __importDefault(require("../middlewares/verifyTokenUser"));
const multer_middlewares_1 = __importDefault(require("../middlewares/multer.middlewares"));
router.post("/users/register", multer_middlewares_1.default.single("image"), user_controllers_1.register);
router.post("/users/login", user_controllers_1.login);
router.get("/users/:id", user_controllers_1.getUser);
router.delete("/users", verifyTokenUser_1.default, user_controllers_1.deleteUser);
router.put("/users", verifyTokenUser_1.default, multer_middlewares_1.default.single("image"), user_controllers_1.updateUser);
router.put("/users-password", user_controllers_1.verifyToken, user_controllers_1.updatePasswordUser);
router.get("/auth", verifyTokenUser_1.default, user_controllers_1.verifyToken);
router.put("/consults/:id/:workID", consult_controllers_1.saveConsult);
router.get("/consults", verifyTokenUser_1.default, consult_controllers_1.getConsults);
router.get("/consults/:id", verifyTokenUser_1.default, consult_controllers_1.getConsult);
router.delete("/consults/:id", verifyTokenUser_1.default, consult_controllers_1.deleteConsult);
exports.default = router;
