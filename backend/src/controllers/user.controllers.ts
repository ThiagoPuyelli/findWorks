import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.models";
import encyp from "../methods/encryptPassword.methods";
import comp from "../methods/comparePassword.methods";
import fs from "fs";
import path from "path";
import { v2 } from "cloudinary";

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
            const image = await v2.uploader.upload(path.join(__dirname, "../uploads/" + req.file.filename));
            if(image){
                const { public_id, url } = image;
                newUser.image = url;
                newUser.public_id = public_id;
                await fs.unlinkSync(path.join(__dirname, "../uploads/" + req.file.filename));
            } else {
                res.json({
                    error: "Error al asignar la imagen"
                })
            }
        }

        if(newUser){
            const user = await newUser.save();

            if(user){
                const jwtPassword: any = process.env.JWT_PASSWORD
                const token = jwt.sign({id: user.id}, jwtPassword, {
                    expiresIn: 60 * 60 * 24
                });
                res.json({
                    auth: true,
                    token: "0|" + token + "|" + user.id
                });
            } else {
                res.json({
                    auth: false,
                    error: "Error al registrar usuario"
                });
            }

        } else {
            res.json({
                auth: false,
                error: "Los datos del usuario no son válidos"
            });
        }
    } else {
        res.json({
            auth: false,
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
                auth: true,
                token: "0|" + token + "|" + user._id
            });
        } else {
            res.json({
                auth: false,
                error: "La contraseña no es válida"
            });
        }
    } else {
        res.json({
            auth: false,
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
    var user
    if(req.params.id){
        user = await User.findById(req.params.id);
    } else {
        const userID: any = req.headers["x-access-token"];
        user = await User.findById(userID.split("|")[2]);
    }

    if(user){
        if(user.image && user.public_id){
            var destroyImage = await v2.uploader.destroy(user.public_id);
            if(!destroyImage){
                res.json({
                    error: "Error al eliminar la imagen"
                })
            };
        }
        const userDelete = await User.findByIdAndRemove(user._id);
        if(userDelete){
            res.json(userDelete);
        } else {
            res.json({
                error: "Error al eliminar el usuario"
            });
        }
    } else {
        res.json({
            error: "Error al eliminar usuario, o el usuario no existe"
        })
    }

}

export var updateUser = async (req: Request, res: Response) => {
    var userToUpdate;
    if(req.params.id){
        userToUpdate = await User.findByIdAndRemove(req.params.id);
    } else {
        const userID: any = req.headers["x-access-token"];
        userToUpdate = await User.findByIdAndRemove(userID.split("|")[1]);
    }


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

export var verifyToken = (req: Request, res: Response) => res.json({auth: true});