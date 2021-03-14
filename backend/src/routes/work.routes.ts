import { Router } from "express";
const router = Router();
import verifyTokenUser from "../middlewares/verifyTokenUser";
import multer from "../middlewares/multer.middlewares";
import { saveWork, getWorks, getWork, updateWork, deleteWork, getWorksCategory, getQuantityPagesCategory, getQuantityPages, getWorksUser, getCategories } from "../controllers/works.controllers";

router.post("/works", verifyTokenUser, multer.single("image"), saveWork);
router.get("/works/:page", getWorks);
router.get("/works-id/:id", getWork);
router.put("/works/:id", verifyTokenUser, multer.single("image"), updateWork);
router.delete("/works/:id", verifyTokenUser, deleteWork);
router.get("/works-categories/:categories/:page", getWorksCategory);
router.get("/works-user", verifyTokenUser, getWorksUser);
router.get("/categories", getCategories);
router.get("/pages", getQuantityPages);
router.get("/pages/:category", getQuantityPagesCategory);

export default router;