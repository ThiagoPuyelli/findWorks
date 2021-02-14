import { Request, Response } from "express";
import jwt, { verify } from "jsonwebtoken";
import User from "../models/User.models";
import encyp from "../methods/encryptPassword.methods";
import comp from "../methods/comparePassword.methods";
import fs from "fs";
import path from "path";

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

export var login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});

    if(user){
        const verifyPassword: boolean = await comp(password, user.password);

        if(verifyPassword){
            const jwtPassword: any = process.env.JWT_PASSWORD;
            const token: string = jwt.sign({id: user._id}, jwtPassword, {
                expiresIn: 60 * 60 * 24
            });

            res.json({
                token: "0|" + token + "|" + user._id
            });
        } else {
            res.json({
                error: "La contraseña no es válida"
            });
        }
    } else {
        res.json({
            error: "El email no es válido"
        });
    }
    
}

export var getUsers = async (req: Request, res: Response) => {
    const users = await User.find();

    if(users){
        res.json(users);
    } else {
        res.json({
            error: "No hay usuarios, o ocurrio un error al buscarlos"
        });
    }
}

export var getUser = async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);

    if(user){
        res.json(user);
    } else {
        res.json({
            error: "No hay usuario, o ocurrio un error al buscarlo"
        });
    }
}

export var deleteUser = async (req: Request, res: Response) => {
    const userDelete = await User.findByIdAndRemove(req.params.id);

    if(userDelete){
        await fs.unlinkSync(path.join(__dirname + "/../uploads/" + userDelete.image));
        res.json({
            message: "Usuario eliminado"
        })
    } else {
        res.json({
            error: "Error al eliminar usuario, o el usuario no existe"
        })
    }

}

export var updateUser = async (req: Request, res: Response) => {
    const userToUpdate = await User.findById(req.params.id);

    if(userToUpdate){
        console.log(req.body)
        for(let i in req.body){
            userToUpdate[i] = req.body[i];
        }

        if(req.file){
            await fs.unlinkSync(path.join(__dirname + "/../uploads/" + userToUpdate.image));
            userToUpdate.image = req.file.filename;
        }

        if(userToUpdate){
            const userUpdate = await User.findByIdAndUpdate(userToUpdate._id, userToUpdate, {new: true});
            res.json(userUpdate);
        } else {
            res.json({
                error: "Un dato no es válido"
            });
        }

    } else {
        res.json({
            error: "El usuario no es válido"
        });
    }
}