import { Router } from "express";
const router = Router();
import verifyTokenUser from "../middlewares/verifyTokenUser";
import multer from "../middlewares/multer.middlewares";
import { saveWork, getWorks, getWork, updateWork, deleteWork, getWorksCategory, getWorksUser } from "../controllers/works.controllers";

router.post("/works", verifyTokenUser, multer.single("image"), saveWork);
router.get("/works", verifyTokenUser, getWorks);
router.get("/works/:id", verifyTokenUser, getWork);
router.put("/works/:id", verifyTokenUser, multer.single("image"), updateWork);
router.delete("/works/:id", verifyTokenUser, deleteWork);
router.get("/works-categories/:categories", verifyTokenUser, getWorksCategory);
router.get("/works-user", verifyTokenUser, getWorksUser)

export default router;