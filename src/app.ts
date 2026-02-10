import express from "express";
import {Request, Response, NextFunction} from "express";

import auth from "./auth/auth.router";
import postRoutes from "./posts/post.router";
import commentRoutes from "./comments/comment.router"

const app = express();

const port = process.env.PORT || 3000;

// parsers
app.use(express.urlencoded({ extended: true, limit: '5mb'}));
app.use(express.json({limit: '5mb'}));

// base routes
app.use(auth)
app.use("/", postRoutes)
app.use("/", commentRoutes)

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
