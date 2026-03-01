import multer from "multer";
import { CloudinaryStorage } from "@fluidjs/multer-cloudinary";
import cloudinary from "../config/cloudinaryConfig";
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "coe-blog",
        allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    },
});

export const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});
