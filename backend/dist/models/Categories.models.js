"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Categorie = new mongoose_1.Schema({
    categorie: { type: String, required: true }
});
exports.default = mongoose_1.model("categorie", Categorie);
