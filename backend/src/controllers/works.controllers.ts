import Work from "../models/Work.models";
import Categories from "../models/Categories.models";
import e, { Request, Response } from "express";
import User from "../models/User.models";
import fs from "fs";
import path from "path";
import { v2 } from "cloudinary";
import separeWorks from "../methods/separeWorks";

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

export var getQuantityPages = async (req: Request, res: Response) => {
    var works = [];
    if(req.params.category){
        works = await Work.find({category: req.params.category});
    } else {
        works = await Work.find();
    }
    var contador: Array<number> = [];
    for(let i = 0; i < works.length; i++){
        if(i == 0){
            contador.push(i);
        } else {
            i *= 10;
            if(i < works.length) contador.push(i);
        }
    }
    res.json(contador);
}

export var getQuantityPagesCategory = async (req: Request, res: Response) => {
    var category: string|Array<string> = req.params.category;
    console.log(category)
    if(category){
        category = category.split("-");
        var works: Array<any> = [];
        for(let i of category){
            const worksSearch = await Work.find({category: i});
            works.push(...worksSearch);
        }
        var contador: Array<number> = [];
        for(let i = 0; i < works.length; i++){
            if(i == 0){
                contador.push(i);
            } else {
                i *= 10;
                if(i < works.length) contador.push(i);
            }
        }
        res.json(contador);
    } else {
        res.json({
            error: "La categoría no es válida"
        })
    }
}

export var getWorks = async (req: Request, res: Response) => {
    const worksTotal = await Work.find();
    const works = await separeWorks(worksTotal, parseInt(req.params.page));
    res.json(works);
};

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
            work.requeriments = work.requeriments[0].split("-");
    
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
    const page: number = parseInt(req.params.page);
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
        categories = categories[0];
        const worksFind = await Work.find({category: categories});
        works = worksFind;
    }
    if(works.length > 0){
        works.sort((a: any, b: any) => {
            new Date(a.date).getTime() > new Date(b.date).getTime()
        })
    }
    const worksSend = await separeWorks(works, page);
    if(worksSend) res.json(worksSend);
    res.json({
        error: "No se pudo separar los trabajos"
    });
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