"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const user_controllers_1 = require("../controllers/user.controllers");
const admin_controllers_1 = require("../controllers/admin.controllers");
const verifyTokenAdmin_1 = __importDefault(require("../middlewares/verifyTokenAdmin"));
router.put("/admin-users/:id", verifyTokenAdmin_1.default, user_controllers_1.updateUser);
router.delete("/admin-users/:id", verifyTokenAdmin_1.default, user_controllers_1.deleteUser);
router.get("/users", verifyTokenAdmin_1.default, user_controllers_1.getUsers);
router.post("/admin", verifyTokenAdmin_1.default, admin_controllers_1.saveAdmin);
router.post("/admin/login", admin_controllers_1.login);
router.put("/admin-email", verifyTokenAdmin_1.default, admin_controllers_1.adminUpdateEmail);
router.put("/admin-password", verifyTokenAdmin_1.default, admin_controllers_1.adminUpdatePassword);
exports.default = router;