const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Admin = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});

export default mongoose.model("admin", Admin);