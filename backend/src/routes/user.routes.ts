import { Router } from "express";
const router = Router();
import { register, login, getUser, deleteUser, updateUser, verifyToken } from "../controllers/user.controllers";
import verifyTokenUser from "../middlewares/verifyTokenUser";
import multer from "../middlewares/multer.middlewares";

router.post("/users/register", multer.single("image"), register);
router.post("/users/login", login);
router.get("/users/:id", verifyTokenUser, getUser);
router.delete("/users", verifyTokenUser, deleteUser);
router.put("/users", verifyTokenUser, multer.single("image"), updateUser);
router.get("/auth", verifyTokenUser, verifyToken);

export default router;