import multer from "multer";
import path from "path";
import uuid from "uuid";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        const originalnameSplit = originalname.split(".");
        const fileExt = originalnameSplit[originalnameSplit.length - 1];

        var fileID: string = "";
        var contador: number = 0;
        while(contador < 1){
            fileID = uuid.v4();
            const verify = fs.existsSync(path.join(`${__dirname}../uploads/${fileID}.${fileExt}`));
            if(!verify){
                contador++;
            }
        }

        cb(null, fileID + "." + fileExt);
    }
})

export default multer({
    storage,
    fileFilter: (req, file, next) => {
        const image = file.mimetype.startsWith("image/");
        if(image){
            next(null, true);
        } else {
            next(null, false);
        }
    }
})