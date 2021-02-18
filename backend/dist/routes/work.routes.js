"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const verifyTokenUser_1 = __importDefault(require("../middlewares/verifyTokenUser"));
const multer_middlewares_1 = __importDefault(require("../middlewares/multer.middlewares"));
const works_controllers_1 = require("../controllers/works.controllers");
router.post("/works", verifyTokenUser_1.default, multer_middlewares_1.default.single("image"), works_controllers_1.saveWork);
router.get("/works", verifyTokenUser_1.default, works_controllers_1.getWorks);
router.get("/works/:id", verifyTokenUser_1.default, works_controllers_1.getWork);
router.put("/works/:id", verifyTokenUser_1.default, multer_middlewares_1.default.single("image"), works_controllers_1.updateWork);
router.delete("/works/:id", verifyTokenUser_1.default, works_controllers_1.deleteWork);
router.get("/works-categories/:categories", verifyTokenUser_1.default, works_controllers_1.getWorksCategory);
router.get("/works-user", verifyTokenUser_1.default, works_controllers_1.getWorksUser);
exports.default = router;
