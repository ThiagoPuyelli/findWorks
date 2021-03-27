const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Work = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, default: Date.now()},
    category: {type: String, required: true},
    location: {type: String, required: true},
    locationwork: {type: String, required: true},
    time: {type: String, required: true},
    userID: {type: Schema.ObjectId, required: true},
    image: {type: String},
    public_id: {type: String},
    requeriments: {type: [String], required: true}
})

export default mongoose.model("work", Work);