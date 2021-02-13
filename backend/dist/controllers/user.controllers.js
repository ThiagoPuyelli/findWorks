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
exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_models_1 = __importDefault(require("../models/User.models"));
const encryptPassword_methods_1 = __importDefault(require("../methods/encryptPassword.methods"));
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
        if (newUser) {
            const user = yield User_models_1.default.save(newUser);
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
