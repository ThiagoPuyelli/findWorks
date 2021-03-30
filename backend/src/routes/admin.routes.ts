import { Router } from "express";
const router = Router();
import { updateUser, deleteUser, getUsers } from "../controllers/user.controllers";
import { saveAdmin, login, adminUpdateEmail, adminUpdatePassword, addCategorie, getAdmins, deleteAdmin, getAdmin } from "../controllers/admin.controllers";
import verifyTokenAdmin from "../middlewares/verifyTokenAdmin";

router.put("/admin-users/:id", verifyTokenAdmin, updateUser);
router.delete("/admin-users/:id", verifyTokenAdmin, deleteUser);
router.get("/users", verifyTokenAdmin, getUsers);
router.get("/admin", verifyTokenAdmin, getAdmins);
router.post("/admin", verifyTokenAdmin, saveAdmin);
router.post("/admin/login", login);
router.put("/admin-email", verifyTokenAdmin, adminUpdateEmail);
router.put("/admin-password", verifyTokenAdmin, adminUpdatePassword);
router.post("/categories", verifyTokenAdmin, addCategorie);
router.get("/admin/auth", verifyTokenAdmin, (req, res) => res.json({auth: true}));
router.delete("/admin/:id", verifyTokenAdmin, deleteAdmin);
router.get("/admin/:id", verifyTokenAdmin, getAdmin);

export default router;