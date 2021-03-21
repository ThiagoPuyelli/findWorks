"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Work = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now() },
    category: { type: String, required: true },
    location: { type: String, required: true },
    locationwork: { type: String, required: true },
    time: { type: String, required: true },
    userID: { type: Schema.ObjectId, required: true },
    image: { type: String },
    public_id: { type: String },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    calificates: { type: [Number], default: [], min: 0, max: 5 },
    requeriments: { type: [String], required: true }
});
exports.default = mongoose.model("work", Work);
