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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Admin_models_1 = __importDefault(require("../models/Admin.models"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['x-access-token'].split("|")[1];
    if (!token) {
        return res.status(404).send({
            auth: false,
            message: "Usuario no identificado"
        });
    }
    if (req.headers["x-access-token"].split("|")[0] == "0") {
        return res.status(404).send({
            auth: false,
            message: "No eres un admin, no puedes realizar esta funcion"
        });
    }
    else {
        const adminAuth = yield Admin_models_1.default.findById(req.headers["x-access-token"].split("|")[2]);
        if (!adminAuth) {
            return res.status(404).json({
                auth: false,
                message: "El id del usuario no es válido"
            });
        }
        req.body.admin = adminAuth;
    }
    const jwtPassword = process.env.JWT_PASSWORD;
    jsonwebtoken_1.default.verify(token, jwtPassword, (err, decoded) => {
        if (err)
            return res.status(404).send({ error: "Token inválido" });
        if (decoded) {
            req.decoded = decoded;
            next();
        }
    });
});
