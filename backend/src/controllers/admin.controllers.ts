import Admin from "../models/Admin.models";
import { Request, Response } from "express";
import comp from "../methods/comparePassword.methods";
import jwt from "jsonwebtoken";
import encp from "../methods/encryptPassword.methods";
import Categorie from "../models/Categories.models";

export var saveAdmin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if(email && password){
        const admin: any = new Admin();

        admin.email = email;
        admin.password = await encp(password);

        const adminSave = await admin.save();

        if(adminSave){
            res.json(adminSave);
        } else {
            res.json({
                error: "Error al almacenar el nuevo usuario admin"
            });
        }
    } else {
        res.json({
            error: "Lo datos no son válidos"
        });
    }
    
}

export var login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if(email && password){
        const admin = await Admin.findOne({email});
        if(admin){
            const verifyPassword: boolean = await comp(password, admin.password);
            if(verifyPassword){
                const jwtPassword: any = process.env.JWT_PASSWORD
                const token: string = jwt.sign({id: admin._id}, jwtPassword, {
                    expiresIn: 60 * 60 * 24
                });
                res.json({
                    auth: true,
                    token: "1|" + token + "|" + admin._id
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
    } else {
        res.json({
            auth: false,
            error: "Los datos no son válidos"
        });
    }
}

export var adminUpdateEmail = async (req: Request, res: Response) => {
    const { postEmail, email } = req.body;
   if(postEmail && email){
       const { admin } = req.body;
       if(postEmail == admin.email){
           admin.email = email;
           res.json(await Admin.findByIdAndUpdate(admin._id, admin, {new: true}));
       } else {
           res.json({
               error: "El email anterior no es correcto"
           });
       }
   } else {
       res.json({
           error: "Los datos no son válidos"
       });
   } 
}

export var adminUpdatePassword = async (req: Request, res: Response) => {
    const { postPassword, password } = req.body;
    if(postPassword && password){
        const { admin } = req.body;
        if(await comp(postPassword, admin.password)){
            admin.password = await encp(password);
            res.json(await Admin.findByIdAndUpdate(admin._id, admin, {new: true}));
        } else {
            res.json({
                error: "La contraseña anterior no es correcta"
            });
        }
    } else {
        res.json({
            error: "Los datos no son válidos"
        });
    }
}

export var deleteAdmin = async (req: Request, res: Response) => {
    const adminDelete = await Admin.findByIdAndRemove(req.params.id);
    res.json(adminDelete);
}

export var addCategorie = async (req: Request, res: Response) => {
    const { category } = req.body;
    
    if(category){
        const categorie: any = new Categorie();
        categorie.categorie = categorie;
        const categorySave: any = await categorie.save();
        if(categorySave){
            res.json(categorySave);
        } else {
            res.json({
                error: "Error al guardar la categoria"
            });
        }
    } else {
        res.json({
            error :"La informacion no es válida"
        });
    }
}