import { Schema, model } from "mongoose";

const Admin: Schema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});

export default model("admin", Admin);