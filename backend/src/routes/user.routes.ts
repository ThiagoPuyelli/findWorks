import { Router } from "express";
const router = Router();
import { register, login, getUsers, getUser, deleteUser, updateUser } from "../controllers/user.controllers";
import multer from "../middlewares/multer.middlewares";

router.post("/users/register", multer.single("image"), register);
router.post("/users/login", login);
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", multer.single("image"), updateUser);

export default router;