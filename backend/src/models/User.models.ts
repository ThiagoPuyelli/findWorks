const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    description:  {type: String, required: true},
    worksID: {type: [Schema.ObjectId], ref: "work", default: []},
    consults: {type: [{
        workID: {type: Schema.ObjectId, ref: "work", required: true},
        title: {type: String, required: true},
        description: {type: String, required: true},
        phone: {type: String, required: true},
        email: {type: String, required: true},
        date: {type: Date, default: Date.now()},
        otherData: {type: [{
            title: {type: String, required: true},
            data: {type: String, required: true}
        }], default: []}
    }], default: []},
    image: {type: String}
})

export default mongoose.model("user", userSchema);