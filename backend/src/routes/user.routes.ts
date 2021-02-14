import { Router } from "express";
const router = Router();
import { register } from "../controllers/user.controllers";
import multer from "../middlewares/multer.middlewares";

router.post("/users/register", multer.single("image"), register);

export default router;