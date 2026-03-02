import { Router } from "express";
import { handleImageUpload } from "./upload.controller";
import multer from "multer";

const router = Router();

const upload = multer({storage: multer.memoryStorage()});

router.post(
    "/uploadImage", 
    upload.single('file'),
    handleImageUpload
);

export default router;
