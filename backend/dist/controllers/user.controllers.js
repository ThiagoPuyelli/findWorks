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
exports.verifyToken = exports.updateUser = exports.deleteUser = exports.getUser = exports.getUsers = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_models_1 = __importDefault(require("../models/User.models"));
const encryptPassword_methods_1 = __importDefault(require("../methods/encryptPassword.methods"));
const comparePassword_methods_1 = __importDefault(require("../methods/comparePassword.methods"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = require("cloudinary");
var register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = yield User_models_1.default.findOne({ email: req.body.email });
    if (!userEmail) {
        const newUser = new User_models_1.default();
        for (let i in req.body) {
            if (i == "password") {
                newUser.password = yield encryptPassword_methods_1.default(req.body.password);
            }
            else {
                newUser[i] = req.body[i];
            }
        }
        if (req.file) {
            const image = yield cloudinary_1.v2.uploader.upload(path_1.default.join(__dirname, "../uploads/" + req.file.filename));
            if (image) {
                const { public_id, url } = image;
                newUser.image = url;
                newUser.public_id = public_id;
                yield fs_1.default.unlinkSync(path_1.default.join(__dirname, "../uploads/" + req.file.filename));
            }
            else {
                res.json({
                    error: "Error al asignar la imagen"
                });
            }
        }
        if (newUser) {
            const user = yield newUser.save();
            if (user) {
                const jwtPassword = process.env.JWT_PASSWORD;
                const token = jsonwebtoken_1.default.sign({ id: user.id }, jwtPassword, {
                    expiresIn: 60 * 60 * 24
                });
                res.json({
                    auth: true,
                    token: "0|" + token + "|" + user.id
                });
            }
            else {
                res.json({
                    auth: false,
                    error: "Error al registrar usuario"
                });
            }
        }
        else {
            res.json({
                auth: false,
                error: "Los datos del usuario no son válidos"
            });
        }
    }
    else {
        res.json({
            auth: false,
            error: "El email ya existe"
        });
    }
});
exports.register = register;
var login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_models_1.default.findOne({ email });
    if (user) {
        const verifyPassword = yield comparePassword_methods_1.default(password, user.password);
        if (verifyPassword) {
            const jwtPassword = process.env.JWT_PASSWORD;
            const token = jsonwebtoken_1.default.sign({ id: user._id }, jwtPassword, {
                expiresIn: 60 * 60 * 24
            });
            res.json({
                auth: true,
                token: "0|" + token + "|" + user._id
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
});
exports.login = login;
var getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_models_1.default.find();
    if (users) {
        res.json(users);
    }
    else {
        res.json({
            error: "No hay usuarios, o ocurrio un error al buscarlos"
        });
    }
});
exports.getUsers = getUsers;
var getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_models_1.default.findById(req.params.id);
    if (user) {
        res.json(user);
    }
    else {
        res.json({
            error: "No hay usuario, o ocurrio un error al buscarlo"
        });
    }
});
exports.getUser = getUser;
var deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var user;
    if (req.params.id) {
        user = yield User_models_1.default.findById(req.params.id);
    }
    else {
        const userID = req.headers["x-access-token"];
        user = yield User_models_1.default.findById(userID.split("|")[2]);
    }
    if (user) {
        if (user.image && user.public_id) {
            var destroyImage = yield cloudinary_1.v2.uploader.destroy(user.public_id);
            if (!destroyImage) {
                res.json({
                    error: "Error al eliminar la imagen"
                });
            }
            ;
        }
        const userDelete = yield User_models_1.default.findByIdAndRemove(user._id);
        if (userDelete) {
            res.json(userDelete);
        }
        else {
            res.json({
                error: "Error al eliminar el usuario"
            });
        }
    }
    else {
        res.json({
            error: "Error al eliminar usuario, o el usuario no existe"
        });
    }
});
exports.deleteUser = deleteUser;
var updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var userToUpdate;
    if (req.params.id) {
        userToUpdate = yield User_models_1.default.findById(req.params.id);
    }
    else {
        const userID = req.headers["x-access-token"];
        userToUpdate = yield User_models_1.default.findById(userID.split("|")[2]);
    }
    if (userToUpdate) {
        for (let i in req.body) {
            userToUpdate[i] = req.body[i];
        }
        if (req.file) {
            const destroyImage = yield cloudinary_1.v2.uploader.destroy(userToUpdate.public_id);
            if (!destroyImage)
                res.json({ error: "Error al eliminar la imagen" });
            const newImage = yield cloudinary_1.v2.uploader.upload(path_1.default.join(__dirname, "../uploads/" + req.file.filename));
            if (!newImage)
                res.json({ error: "Error al agregar nueva imagen" });
            const { url, public_id } = newImage;
            userToUpdate.image = url;
            userToUpdate.public_id = public_id;
            yield fs_1.default.unlinkSync(path_1.default.join(__dirname, "../uploads/" + req.file.filename));
        }
        if (userToUpdate) {
            const userUpdate = yield User_models_1.default.findByIdAndUpdate(userToUpdate._id, userToUpdate, { new: true });
            res.json(userUpdate);
        }
        else {
            res.json({
                error: "Un dato no es válido"
            });
        }
    }
    else {
        res.json({
            error: "El usuario no es válido"
        });
    }
});
exports.updateUser = updateUser;
var verifyToken = (req, res) => res.json({ auth: true });
exports.verifyToken = verifyToken;
