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
exports.getWorksUser = exports.getWorksCategory = exports.deleteWork = exports.updateWork = exports.getWork = exports.getWorks = exports.saveWork = void 0;
const Work_models_1 = __importDefault(require("../models/Work.models"));
const Categories_models_1 = __importDefault(require("../models/Categories.models"));
const User_models_1 = __importDefault(require("../models/User.models"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
var saveWork = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const work = new Work_models_1.default();
    for (let i in req.body) {
        if (i == "category") {
            const category = yield Categories_models_1.default.findOne({ categorie: req.body.category });
            if (category) {
                work.category = category.categorie;
            }
            else {
                res.json({
                    error: "Esa categoría no existe"
                });
            }
        }
        else {
            work[i] = req.body[i];
        }
    }
    if (req.file) {
        work.image = req.file.filename;
    }
    const userID = req.headers["x-access-token"];
    const user = yield User_models_1.default.findById(userID.split("|")[2]);
    work.userID = userID.split("|")[2];
    if (work) {
        const workSave = yield work.save();
        if (workSave) {
            user.worksID.push(workSave._id);
            res.json(workSave);
        }
        else {
            res.json({
                error: "Error al almacenar los datos, o los datos no son válidos"
            });
        }
    }
    else {
        res.json({
            error: "Los datos no son válidos"
        });
    }
});
exports.saveWork = saveWork;
var getWorks = (req, res) => __awaiter(void 0, void 0, void 0, function* () { return res.json(yield Work_models_1.default.find()); });
exports.getWorks = getWorks;
var getWork = (req, res) => __awaiter(void 0, void 0, void 0, function* () { return res.json(yield Work_models_1.default.findById(req.params.id)); });
exports.getWork = getWork;
var updateWork = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const work = yield Work_models_1.default.findById(req.params.id);
    if (work) {
        const token = req.headers["x-access-token"];
        if (work.userID + "" == token.split("|")[2]) {
            for (let i in req.body) {
                if (i == "category") {
                    const category = yield Categories_models_1.default.findOne({ categorie: req.body.category });
                    if (category) {
                        work.category = category.categorie;
                    }
                    else {
                        res.json({
                            error: "Esa categoría no existe"
                        });
                    }
                }
                else {
                    work[i] = req.body[i];
                }
            }
            if (req.file) {
                yield fs_1.default.unlinkSync(path_1.default.join(__dirname, "../uploads/" + work.image));
                work.image = req.file.filename;
            }
            const workUpdate = yield Work_models_1.default.findByIdAndUpdate(work._id, work, { new: true });
            if (workUpdate) {
                res.json(workUpdate);
            }
            else {
                res.json({
                    error: "Fallo al modificar trabajo"
                });
            }
        }
        else {
            res.json({
                error: "No eres dueño de este trabajo"
            });
        }
    }
    else {
        res.json({
            error: "Ese trabajo no existe"
        });
    }
});
exports.updateWork = updateWork;
var deleteWork = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const work = yield Work_models_1.default.findById(req.params.id);
    if (work) {
        const token = req.headers["x-access-token"];
        if (work.userID + "" == token.split("|")[2]) {
            yield fs_1.default.unlinkSync(path_1.default.join(__dirname, "../uploads/" + work.image));
            const workDelete = yield Work_models_1.default.findByIdAndDelete(work._id);
            if (workDelete) {
                res.json("Trabajo eliminado con éxito");
            }
            else {
                res.json({
                    error: "Error al eliminar trabajo"
                });
            }
        }
        else {
            res.json({
                error: "No eres dueño de este trabajo"
            });
        }
    }
    else {
        res.json({
            error: "El trabajo no es válido"
        });
    }
});
exports.deleteWork = deleteWork;
var getWorksCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var categories = req.params.categories;
    if (categories) {
        categories = categories.split("-");
        var works = [];
        if (categories.length > 1) {
            for (let i of categories) {
                const worksFind = yield Work_models_1.default.find({ category: i });
                for (let indexWorksFind of worksFind) {
                    works.push(indexWorksFind);
                }
            }
        }
        else {
            const worksFind = yield Work_models_1.default.find({ category: categories });
            works.push(worksFind);
        }
        if (works.length > 0) {
            works.sort((a, b) => {
                new Date(a.date).getTime() > new Date(b.date).getTime();
            });
        }
        res.json(works);
    }
    else {
        res.json({
            error: "Las categorias no son válidas"
        });
    }
});
exports.getWorksCategory = getWorksCategory;
var getWorksUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers["x-access-token"];
    const works = yield Work_models_1.default.find({ userID: token.split("|")[2] });
    if (works) {
        res.json(works);
    }
    else {
        res.json({
            error: "Error al buscar los trabajos"
        });
    }
});
exports.getWorksUser = getWorksUser;
