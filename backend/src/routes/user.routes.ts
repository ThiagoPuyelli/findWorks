import { Router } from "express";
const router = Router();
import { register } from "../controllers/user.controllers";

router.post("/users/register", register);

export default router;