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
exports.deleteConsult = exports.getConsult = exports.getConsults = exports.saveConsult = void 0;
const User_models_1 = __importDefault(require("../models/User.models"));
const Work_models_1 = __importDefault(require("../models/Work.models"));
var saveConsult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userToConsult = yield User_models_1.default.findById(req.params.id);
    console.log(req.body);
    if (userToConsult) {
        const work = yield Work_models_1.default.findById(req.params.workID);
        if (work) {
            userToConsult.consults.push(Object.assign(Object.assign({}, req.body), { workID: req.params.workID }));
            if (userToConsult) {
                const userUpdate = yield User_models_1.default.findByIdAndUpdate(userToConsult._id, userToConsult, { new: true });
                if (userUpdate) {
                    res.json(userUpdate);
                }
                else {
                    res.json({
                        error: "Los datos no fueron modificados correctamente"
                    });
                }
            }
            else {
                res.json({
                    error: "Los datos no son válidos"
                });
            }
        }
        else {
            res.json({
                error: "El id del trabajo no es válido"
            });
        }
    }
    else {
        res.json({
            error: "El id del usuario no es válido"
        });
    }
});
exports.saveConsult = saveConsult;
var getConsults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var token = req.headers["x-access-token"];
    const user = yield User_models_1.default.findById(token.split("|")[2]);
    if (user) {
        if (user.consults.length > 0) {
            res.json(user.consults);
        }
        else {
            res.json([]);
        }
    }
    else {
        res.json({
            error: "El usuario no es válido"
        });
    }
});
exports.getConsults = getConsults;
var getConsult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var token = req.headers["x-access-token"];
    const user = yield User_models_1.default.findById(token.split("|")[2]);
    if (user) {
        if (user.consults.length > 0) {
            var consult;
            for (let i of user.consults) {
                if (i._id + "" == req.params.id) {
                    consult = i;
                }
            }
            if (consult) {
                res.json(consult);
            }
            else {
                res.json({
                    error: "No se encontro la consulta"
                });
            }
        }
        else {
            res.json({
                error: "No hay ninguna consulta"
            });
        }
    }
});
exports.getConsult = getConsult;
var deleteConsult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var token = req.headers["x-access-token"];
    const user = yield User_models_1.default.findById(token.split("|")[2]);
    if (user) {
        var confirm = false;
        for (let i in user.consults) {
            if (user.consults[i]._id + "" == req.params.id) {
                user.consults.splice(i, 1);
                confirm = true;
            }
        }
        if (!confirm) {
            res.json({
                error: "Esa consulta no existe"
            });
        }
        else {
            const userUpdate = yield User_models_1.default.findByIdAndUpdate(user._id, user, { new: true });
            if (userUpdate) {
                res.json(userUpdate);
            }
            else {
                res.json({
                    error: "Ha ocurrido un error al eliminar la consulta"
                });
            }
        }
    }
    else {
        res.json({
            error: "El usuario no existe"
        });
    }
});
exports.deleteConsult = deleteConsult;
