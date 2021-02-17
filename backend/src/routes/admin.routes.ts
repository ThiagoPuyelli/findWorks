import { Router } from "express";
const router = Router();
import { updateUser, deleteUser, getUsers } from "../controllers/user.controllers";
import { saveAdmin, login, adminUpdateEmail, adminUpdatePassword } from "../controllers/admin.controllers";
import verifyTokenAdmin from "../middlewares/verifyTokenAdmin";

router.put("/admin-users/:id", verifyTokenAdmin, updateUser);
router.delete("/admin-users/:id", verifyTokenAdmin, deleteUser);
router.get("/users", verifyTokenAdmin, getUsers);
router.post("/admin", verifyTokenAdmin, saveAdmin);
router.post("/admin/login", login);
router.put("/admin-email", verifyTokenAdmin, adminUpdateEmail);
router.put("/admin-password", verifyTokenAdmin, adminUpdatePassword);

export default router;