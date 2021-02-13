import { Schema, model } from "mongoose";

const Categorie: Schema = new Schema({
    categorie: {type: String, required: true}
});

export default model("categorie", Categorie);