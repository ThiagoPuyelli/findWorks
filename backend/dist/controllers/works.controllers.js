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
exports.getCategories = exports.getWorksUser = exports.getWorksCategory = exports.deleteWork = exports.updateWork = exports.getWork = exports.getWorks = exports.getQuantityPagesCategory = exports.getQuantityPages = exports.saveWork = void 0;
const Work_models_1 = __importDefault(require("../models/Work.models"));
const Categories_models_1 = __importDefault(require("../models/Categories.models"));
const User_models_1 = __importDefault(require("../models/User.models"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = require("cloudinary");
const separeWorks_1 = __importDefault(require("../methods/separeWorks"));
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
        else if (i == "requeriments") {
            const requerimentsArray = req.body.requeriments.split("-");
            work.requeriments = requerimentsArray;
        }
        else {
            work[i] = req.body[i];
        }
    }
    if (req.file) {
        const newImage = yield cloudinary_1.v2.uploader.upload(path_1.default.join(__dirname, "../uploads/" + req.file.filename));
        if (!newImage)
            res.json({ error: "Error al guardar imagen" });
        work.image = newImage.url;
        work.public_id = newImage.public_id;
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
var getQuantityPages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var works = [];
    if (req.params.category) {
        works = yield Work_models_1.default.find({ category: req.params.category });
    }
    else {
        works = yield Work_models_1.default.find();
    }
    var contador = [];
    for (let i = 0; i < works.length; i++) {
        if (i == 0) {
            contador.push(i);
        }
        else {
            i *= 10;
            if (i < works.length)
                contador.push(i);
        }
    }
    res.json(contador);
});
exports.getQuantityPages = getQuantityPages;
var getQuantityPagesCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var category = req.params.category;
    console.log(category);
    if (category) {
        category = category.split("-");
        var works = [];
        for (let i of category) {
            const worksSearch = yield Work_models_1.default.find({ category: i });
            works.push(...worksSearch);
        }
        var contador = [];
        for (let i = 0; i < works.length; i++) {
            if (i == 0) {
                contador.push(i);
            }
            else {
                i *= 10;
                if (i < works.length)
                    contador.push(i);
            }
        }
        res.json(contador);
    }
    else {
        res.json({
            error: "La categoría no es válida"
        });
    }
});
exports.getQuantityPagesCategory = getQuantityPagesCategory;
var getWorks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const worksTotal = yield Work_models_1.default.find();
    const works = yield separeWorks_1.default(worksTotal, parseInt(req.params.page));
    res.json(works);
});
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
            work.requeriments = work.requeriments[0].split("-");
            if (req.file) {
                const destroyImage = yield cloudinary_1.v2.uploader.destroy(work.public_id);
                if (!destroyImage)
                    res.json({ error: "Error al eliminar la imagen" });
                const newImage = yield cloudinary_1.v2.uploader.upload(path_1.default.join(__dirname, "../uploads/" + req.file.filename));
                if (!newImage)
                    res.json({ error: "Error al agregar nueva imagen" });
                const { url, public_id } = newImage;
                work.image = url;
                work.public_id = public_id;
                yield fs_1.default.unlinkSync(path_1.default.join(__dirname, "../uploads/" + req.file.filename));
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
            const destroyImage = yield cloudinary_1.v2.uploader.destroy(work.public_id);
            if (!destroyImage)
                res.json({ error: "Error al eliminar imagen" });
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
    const page = parseInt(req.params.page);
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
        categories = categories[0];
        const worksFind = yield Work_models_1.default.find({ category: categories });
        works = worksFind;
    }
    if (works.length > 0) {
        works.sort((a, b) => {
            new Date(a.date).getTime() > new Date(b.date).getTime();
        });
    }
    const worksSend = yield separeWorks_1.default(works, page);
    if (worksSend)
        res.json(worksSend);
    res.json({
        error: "No se pudo separar los trabajos"
    });
});
exports.getWorksCategory = getWorksCategory;
var getWorksUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var id;
    if (req.params.id) {
        id = req.params.id;
    }
    else {
        const token = req.headers["x-access-token"];
        id = token.split("|")[2];
    }
    const works = yield Work_models_1.default.find({ userID: id });
    if (works) {
        works.sort((a, b) => {
            new Date(a.date).getTime() > new Date(b.date).getTime();
        });
        res.json(works);
    }
    else {
        res.json({
            error: "Error al buscar los trabajos"
        });
    }
});
exports.getWorksUser = getWorksUser;
var getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () { return res.json(yield Categories_models_1.default.find()); });
exports.getCategories = getCategories;
