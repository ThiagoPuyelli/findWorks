import dotenv from "dotenv";
dotenv.config();
import app from "./app";
require("./database");

const server = app();

server.listen(server.get("port"), () => {
    console.log("Server on port", server.get("port"));
})
