import express from "express";
import cors from "cors";
import helmet from "helmet"; 
import cookieParser from "cookie-parser";
import {Request, Response, NextFunction} from "express";

import auth from "./auth/auth.router";
import userRoutes from "./users/user.router";
import postRoutes from "./posts/post.router";
import likeRoutes from "./likes/like.router";
import commentRoutes from "./comments/comment.router"
import uploadRoutes from "./uploads/upload.router"

const app = express();

const port = process.env.PORT || 3000;

// security headers
app.use(helmet({
    contentSecurityPolicy: false
}));

// parsers
app.use(express.urlencoded({ extended: true, limit: '5mb'}));
app.use(express.json({limit: '5mb'}));
app.use(cookieParser());

// cors 
app.use(cors({
    origin: [
        process.env.MAIN_APP as string,
        "http://localhost:5173",
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// base routes
app.use(auth)
app.use("/", userRoutes)
app.use("/", likeRoutes)
app.use("/", postRoutes)
app.use("/", commentRoutes)
app.use("/", uploadRoutes)

// 404 
app.use((req: Request, res: Response) => {
    res.status(404).json({
        message: "Route not found."
    });
})

// error handling
app.use((
    err: any, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    console.log(err);
    res.status(500).json({
        message: process.env.NODE_ENV === 'production'
            ? "Internal Server Error"
            : err.message
    })
})


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})
