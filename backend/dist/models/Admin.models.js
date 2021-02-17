"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Admin = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});
exports.default = mongoose.model("admin", Admin);
