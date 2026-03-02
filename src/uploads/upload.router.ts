import { Router } from "express";
import { handleImageUpload, handleDeleteUponPost } from "./upload.controller";
import multer from "multer";

const router = Router();

const upload = multer({storage: multer.memoryStorage()});

router.post(
    "/uploadImage", 
    upload.single('file'),
    handleImageUpload
);

router.delete(
    "/uploadImage",
    handleDeleteUponPost
);

export default router;
