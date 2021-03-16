import { Router } from "express";
const router = Router();
import { register, login, getUser, deleteUser, updateUser, verifyToken } from "../controllers/user.controllers";
import { saveConsult, getConsults, getConsult, deleteConsult } from "../controllers/consult.controllers";
import verifyTokenUser from "../middlewares/verifyTokenUser";
import multer from "../middlewares/multer.middlewares";

router.post("/users/register", multer.single("image"), register);
router.post("/users/login", login);
router.get("/users/:id", getUser);
router.delete("/users", verifyTokenUser, deleteUser);
router.put("/users", verifyTokenUser, multer.single("image"), updateUser);
router.get("/auth", verifyTokenUser, verifyToken);
router.put("/consults/:id/:workID", saveConsult);
router.get("/consults", verifyTokenUser, getConsults)
router.get("/consults/:id", verifyTokenUser, getConsult);
router.delete("/consults/:id", verifyTokenUser, deleteConsult);

export default router;