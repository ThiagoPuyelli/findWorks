import User from "../models/User.models";
import { Request, Response } from "express";
import Work from "../models/Work.models";

export var saveConsult = async (req: Request, res: Response) => {
    const userToConsult = await User.findById(req.params.id);
    console.log(req.body)

    if(userToConsult){
        const work = await Work.findById(req.params.workID);
        if(work){
            userToConsult.consults.push({...req.body, workID: req.params.workID});
            if(userToConsult){
                const userUpdate = await User.findByIdAndUpdate(userToConsult._id, userToConsult, {new: true});
                if(userUpdate){
                    res.json(userUpdate);
                } else {
                    res.json({
                        error: "Los datos no fueron modificados correctamente"
                    });
                }
            } else {
                res.json({
                    error: "Los datos no son válidos"
                });
            }
        } else {
            res.json({
                error: "El id del trabajo no es válido"
            })
        }
    } else {
        res.json({
            error: "El id del usuario no es válido"
        });
    }
}

export var getConsults = async (req: Request, res: Response) => {
    var token: any = req.headers["x-access-token"];
    const user = await User.findById(token.split("|")[2]);
    if(user){
        if(user.consults.length > 0){
            res.json(user.consults);
        } else {
            res.json([]);
        }
    } else {
        res.json({
            error: "El usuario no es válido"
        });
    }
}

export var getConsult = async (req: Request, res: Response) => {
    var token: any = req.headers["x-access-token"];
    const user = await User.findById(token.split("|")[2]);
    if(user){
        if(user.consults.length > 0){
            var consult;
            for(let i of user.consults){
                if(i._id + "" == req.params.id){
                    consult = i;
                }
            }

            if(consult){
                res.json(consult);
            } else {
                res.json({
                    error: "No se encontro la consulta"
                })
            }
        } else {
            res.json({
                error: "No hay ninguna consulta"
            })
        }
    }
}

export var deleteConsult = async (req: Request, res: Response) => {
    var token: any = req.headers["x-access-token"];
    const user = await User.findById(token.split("|")[2]);
    if(user){
        var confirm: boolean = false;
        for(let i in user.consults){
            if(user.consults[i]._id + "" == req.params.id){
                user.consults.splice(i, 1);
                confirm = true;
            }
        }
        if(!confirm){
            res.json({
                error: "Esa consulta no existe"
            });
        } else {
            const userUpdate = await User.findByIdAndUpdate(user._id, user, {new: true});
            if(userUpdate){
                res.json(userUpdate);
            } else {
                res.json({
                    error: "Ha ocurrido un error al eliminar la consulta"
                });
            }
        }

    } else {
        res.json({
            error: "El usuario no existe"
        });
    }
}