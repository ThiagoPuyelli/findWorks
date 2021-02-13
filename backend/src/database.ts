import mongoose from "mongoose";

const uri: any = process.env.MONGODB_URI;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
.then(con => console.log("Connect to a database"))
.catch(err => console.log(err));
