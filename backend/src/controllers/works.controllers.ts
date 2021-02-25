import Work from "../models/Work.models";
import Categories from "../models/Categories.models";
import { Request, Response } from "express";
import User from "../models/User.models";
import fs from "fs";
import path from "path";
import { v2 } from "cloudinary";

export var saveWork = async (req: Request, res: Response) => {
    const work = new Work();
    
    for(let i in req.body){
        if(i == "category"){
            const category: any = await Categories.findOne({categorie: req.body.category});
            if(category){
                work.category = category.categorie;
            } else {
                res.json({
                    error: "Esa categoría no existe"
                });
            }
        } else {
            work[i] = req.body[i];
        }
    }

    if(req.file){
        const newImage = await v2.uploader.upload(path.join(__dirname, "../uploads/" + req.file.filename));
        if(!newImage) res.json({error: "Error al guardar imagen"});
        work.image = newImage.url;
        work.public_id = newImage.public_id;
    }

    const userID: any = req.headers["x-access-token"];
    const user = await User.findById(userID.split("|")[2]);
    work.userID = userID.split("|")[2];

    if(work){
        const workSave = await work.save();
        if(workSave){
                user.worksID.push(workSave._id);
                res.json(workSave);
        } else {
            res.json({
                error: "Error al almacenar los datos, o los datos no son válidos"
            });
        }  
    } else {
        res.json({
            error: "Los datos no son válidos"
        });
    }
}

export var getWorks = async (req: Request, res: Response) => res.json(await Work.find());

export var getWork = async (req: Request, res: Response) => res.json(await Work.findById(req.params.id));

export var updateWork = async (req: Request, res: Response) => {
    const work = await Work.findById(req.params.id);
    if(work){
        const token: any = req.headers["x-access-token"];
        if(work.userID + "" == token.split("|")[2]){
            for(let i in req.body){
                if(i == "category"){
                    const category: any = await Categories.findOne({categorie: req.body.category});
                    if(category){
                        work.category = category.categorie;
                    } else {
                        res.json({
                            error: "Esa categoría no existe"
                        });
                    }
                } else {
                    work[i] = req.body[i];
                }
            }
    
            if(req.file){
                const destroyImage = await v2.uploader.destroy(work.public_id);
                if(!destroyImage) res.json({error: "Error al eliminar la imagen"});
    
                const newImage = await v2.uploader.upload(path.join(__dirname, "../uploads/" + req.file.filename));
                if(!newImage) res.json({error: "Error al agregar nueva imagen"});
                const { url, public_id } = newImage;
    
                work.image = url;
                work.public_id = public_id;
                
                await fs.unlinkSync(path.join(__dirname, "../uploads/" + req.file.filename));
            }
    
            const workUpdate = await Work.findByIdAndUpdate(work._id, work, {new: true});
            if(workUpdate){
                res.json(workUpdate);
            } else {
                res.json({
                    error: "Fallo al modificar trabajo"
                });
            }
        } else {
            res.json({
                error: "No eres dueño de este trabajo" 
            });
        }
    } else {
        res.json({
            error: "Ese trabajo no existe"
        });
    }
}

export var deleteWork = async (req: Request, res: Response) => {
    const work = await Work.findById(req.params.id);
    if(work){
        const token: any = req.headers["x-access-token"];
        if(work.userID + "" == token.split("|")[2]){
            const destroyImage = await v2.uploader.destroy(work.public_id);
            if(!destroyImage) res.json({error: "Error al eliminar imagen"});
            const workDelete = await Work.findByIdAndDelete(work._id);
            if(workDelete){
                res.json("Trabajo eliminado con éxito");
            } else {
                res.json({
                    error: "Error al eliminar trabajo"
                });
            }
        } else {
            res.json({
                error: "No eres dueño de este trabajo"
            });
        }
    } else {
        res.json({
            error: "El trabajo no es válido"
        });
    }
}

export var getWorksCategory = async (req: Request, res: Response) => {
    var categories: string|string[] = req.params.categories;
    if(categories){
        categories = categories.split("-");
        var works: any = [];
        if(categories.length > 1){
            for(let i of categories){
                const worksFind = await Work.find({category: i});
                for(let indexWorksFind of worksFind){
                    works.push(indexWorksFind);
                }
            }
        } else {
            const worksFind = await Work.find({category: categories});
            works.push(worksFind);
        }
        if(works.length > 0){
            works.sort((a: any, b: any) => {
                new Date(a.date).getTime() > new Date(b.date).getTime()
            })
        }
        res.json(works);
    } else {
        res.json({
            error: "Las categorias no son válidas"
        });
    }
}

export var getWorksUser = async (req: Request, res: Response) => {
    const token: any = req.headers["x-access-token"];
    const works = await Work.find({userID: token.split("|")[2]});
    if(works){
        works.sort((a: any, b: any) => {
            new Date(a.date).getTime() > new Date(b.date).getTime();
        })
        res.json(works);
    } else {
        res.json({
            error: "Error al buscar los trabajos"
        });
    }
}

export var getCategories = async (req: Request, res: Response) => res.json(await Categories.find());