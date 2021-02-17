import jwt from "jsonwebtoken"
import { Response, NextFunction } from "express"; 
import User from "../models/User.models";

export default async (req: any, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token'].split("|")[1];

    if(!token){
        return res.status(404).send({
            auth: false,
            message: "Usuario no identificado"
        });
    }

    if(req.headers["x-access-token"].split("|")[0] == "1") {
        return res.status(404).send({
            auth: false,
            message: "Eres un usuario admin, no puedes realizar esta funcion"
        });
    } else {
        const userAuth = await User.findById(req.headers["x-access-token"].split("|")[2]);
        if(!userAuth){
            return res.status(404).json({
                auth: false,
                message: "El id del usuario no es válido"
            });
        }
    }

    const jwtPassword: any = process.env.JWT_PASSWORD;

    jwt.verify(token, jwtPassword, (err: any, decoded: any) => {
        if(err) return res.status(404).send({error: "Token inválido"});

        if(decoded){
            req.decoded = decoded;
            next()
        }
    });
}