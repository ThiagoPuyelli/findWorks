import dotenv from "dotenv";
dotenv.config();
import app from "./app";
require("./database");
import cloudConfig from "./cloudinary";

const server = app();

cloudConfig();

server.listen(server.get("port"), () => {
    console.log("Server on port", server.get("port"));
})
