"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    description: { type: String, required: true },
    worksID: { type: [Schema.ObjectId], ref: "work", default: [] },
    image: { type: String }
});
exports.default = mongoose.model("user", userSchema);
