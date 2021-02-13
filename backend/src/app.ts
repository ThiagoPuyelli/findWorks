import morgan from "morgan";
import express from "express";
import { Request, Response, NextFunction } from "express";
import userRoutes from "./routes/user.routes";

export default () => {

    const app = express();
    
    // Config
    app.set("port", process.env.PORT || 9000);

    // Middlewares

    app.use(morgan("dev"));
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

    // Cors 
    
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, x-access-token');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });

    // Routes
    
    app.use(userRoutes);

    return app;
    
}