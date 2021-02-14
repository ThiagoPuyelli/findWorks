import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.models";
import encyp from "../methods/encryptPassword.methods";

export var register = async (req: Request, res: Response) => {
    const userEmail = await User.findOne({email: req.body.email});
    if(!userEmail){
        const newUser = new User();
        for(let i in req.body){
            if(i == "password"){
                newUser.password = await encyp(req.body.password);
            } else {
                newUser[i] = req.body[i];
            }
        }

        if(req.file){
            newUser.image = req.file.filename;
        }

        if(newUser){
            const user = await newUser.save();

            if(user){
                const jwtPassword: any = process.env.JWT_PASSWORD
                const token = jwt.sign({id: user.id}, jwtPassword, {
                    expiresIn: 60 * 60 * 24
                });
                res.json({
                    token: "0|" + token + "|" + user.id
                });
            } else {
                res.json({
                    error: "Error al registrar usuario"
                });
            }

        } else {
            res.json({
                error: "Los datos del usuario no son válidos"
            });
        }
    } else {
        res.json({
            error: "El email ya existe"
        });
    }
}