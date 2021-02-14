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
exports.updateUser = exports.deleteUser = exports.getUser = exports.getUsers = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_models_1 = __importDefault(require("../models/User.models"));
const encryptPassword_methods_1 = __importDefault(require("../methods/encryptPassword.methods"));
const comparePassword_methods_1 = __importDefault(require("../methods/comparePassword.methods"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
            newUser.image = req.file.filename;
        }
        if (newUser) {
            const user = yield newUser.save();
            if (user) {
                const jwtPassword = process.env.JWT_PASSWORD;
                const token = jsonwebtoken_1.default.sign({ id: user.id }, jwtPassword, {
                    expiresIn: 60 * 60 * 24
                });
                res.json({
                    token: "0|" + token + "|" + user.id
                });
            }
            else {
                res.json({
                    error: "Error al registrar usuario"
                });
            }
        }
        else {
            res.json({
                error: "Los datos del usuario no son válidos"
            });
        }
    }
    else {
        res.json({
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
                token: "0|" + token + "|" + user._id
            });
        }
        else {
            res.json({
                error: "La contraseña no es válida"
            });
        }
    }
    else {
        res.json({
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
    const userDelete = yield User_models_1.default.findByIdAndRemove(req.params.id);
    if (userDelete) {
        yield fs_1.default.unlinkSync(path_1.default.join(__dirname + "/../uploads/" + userDelete.image));
        res.json({
            message: "Usuario eliminado"
        });
    }
    else {
        res.json({
            error: "Error al eliminar usuario, o el usuario no existe"
        });
    }
});
exports.deleteUser = deleteUser;
var updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userToUpdate = yield User_models_1.default.findById(req.params.id);
    if (userToUpdate) {
        console.log(req.body);
        for (let i in req.body) {
            userToUpdate[i] = req.body[i];
        }
        if (req.file) {
            yield fs_1.default.unlinkSync(path_1.default.join(__dirname + "/../uploads/" + userToUpdate.image));
            userToUpdate.image = req.file.filename;
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
