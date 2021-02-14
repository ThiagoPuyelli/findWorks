"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = __importDefault(require("uuid"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, "../uploads"));
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        const originalnameSplit = originalname.split(".");
        const fileExt = originalnameSplit[originalnameSplit.length - 1];
        var fileID = "";
        var contador = 0;
        while (contador < 1) {
            fileID = uuid_1.v4();
            const verify = fs_1.default.existsSync(path_1.default.join(`${__dirname}../uploads/${fileID}.${fileExt}`));
            if (!verify) {
                contador++;
            }
        }
        cb(null, fileID + "." + fileExt);
    }
});
exports.default = multer_1.default({
    storage,
    fileFilter: (req, file, next) => {
        const image = file.mimetype.startsWith("image/");
        if (image) {
            next(null, true);
        }
        else {
            next(null, false);
        }
    }
});
