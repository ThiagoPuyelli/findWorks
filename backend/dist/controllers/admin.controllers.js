"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCategorie = exports.deleteAdmin = exports.adminUpdatePassword = exports.adminUpdateEmail = exports.login = exports.saveAdmin = void 0;
const Admin_models_1 = __importDefault(require("../models/Admin.models"));
const comparePassword_methods_1 = __importDefault(require("../methods/comparePassword.methods"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const encryptPassword_methods_1 = __importDefault(require("../methods/encryptPassword.methods"));
const Categories_models_1 = __importDefault(require("../models/Categories.models"));
var saveAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (email && password) {
        const admin = new Admin_models_1.default();
        admin.email = email;
        admin.password = yield encryptPassword_methods_1.default(password);
        const adminSave = yield admin.save();
        if (adminSave) {
            res.json(adminSave);
        }
        else {
            res.json({
                error: "Error al almacenar el nuevo usuario admin"
            });
        }
    }
    else {
        res.json({
            error: "Lo datos no son válidos"
        });
    }
});
exports.saveAdmin = saveAdmin;
var login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (email && password) {
        const admin = yield Admin_models_1.default.findOne({ email });
        if (admin) {
            const verifyPassword = yield comparePassword_methods_1.default(password, admin.password);
            if (verifyPassword) {
                const jwtPassword = process.env.JWT_PASSWORD;
                const token = jsonwebtoken_1.default.sign({ id: admin._id }, jwtPassword, {
                    expiresIn: 60 * 60 * 24
                });
                res.json({
                    auth: true,
                    token: "1|" + token + "|" + admin._id
                });
            }
            else {
                res.json({
                    auth: false,
                    error: "La contraseña no es válida"
                });
            }
        }
        else {
            res.json({
                auth: false,
                error: "El email no es válido"
            });
        }
    }
    else {
        res.json({
            auth: false,
            error: "Los datos no son válidos"
        });
    }
});
exports.login = login;
var adminUpdateEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postEmail, email } = req.body;
    if (postEmail && email) {
        const { admin } = req.body;
        if (postEmail == admin.email) {
            admin.email = email;
            res.json(yield Admin_models_1.default.findByIdAndUpdate(admin._id, admin, { new: true }));
        }
        else {
            res.json({
                error: "El email anterior no es correcto"
            });
        }
    }
    else {
        res.json({
            error: "Los datos no son válidos"
        });
    }
});
exports.adminUpdateEmail = adminUpdateEmail;
var adminUpdatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postPassword, password } = req.body;
    if (postPassword && password) {
        const { admin } = req.body;
        if (yield comparePassword_methods_1.default(postPassword, admin.password)) {
            admin.password = yield encryptPassword_methods_1.default(password);
            res.json(yield Admin_models_1.default.findByIdAndUpdate(admin._id, admin, { new: true }));
        }
        else {
            res.json({
                error: "La contraseña anterior no es correcta"
            });
        }
    }
    else {
        res.json({
            error: "Los datos no son válidos"
        });
    }
});
exports.adminUpdatePassword = adminUpdatePassword;
var deleteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const adminDelete = yield Admin_models_1.default.findByIdAndRemove(req.params.id);
    res.json(adminDelete);
});
exports.deleteAdmin = deleteAdmin;
var addCategorie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.body;
    if (category) {
        const categorie = new Categories_models_1.default();
        categorie.categorie = categorie;
        const categorySave = yield categorie.save();
        if (categorySave) {
            res.json(categorySave);
        }
        else {
            res.json({
                error: "Error al guardar la categoria"
            });
        }
    }
    else {
        res.json({
            error: "La informacion no es válida"
        });
    }
});
exports.addCategorie = addCategorie;
