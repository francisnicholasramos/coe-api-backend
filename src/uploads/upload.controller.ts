import type {RequestHandler} from "express";
import cloudinary from "../config/cloudinaryConfig";

// TODO: delete image if user decides to remove it during create post
export const handleImageUpload: RequestHandler  = (req, res) => { 
    const stream = cloudinary.uploader.upload_stream(
        { 
            folder: `${process.env.CLOUDINARY_SECRET_FOLDER}`,
            allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"] 
        },
        (error, result) => {
            if (error) return res.status(500).json({ error: error.message });
            res.json({ url: result?.secure_url });
        }
    ).end(req.file?.buffer)

    return stream;
}

// if user remove image from content
export const handleDeleteUponEdit = async (
    oldContent: string,
    newContent: string
): Promise<string[]>  => {
    const cloudinaryUrls = (content: string): string[] => {
        const regex = /https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/[^/]+\/[^"]+/g;
        return content.match(regex) || [];
    };

    const oldUrls = cloudinaryUrls(oldContent || '');
    const newUrls = cloudinaryUrls(newContent || '');

    const removedUrls = oldUrls.filter(url => !newUrls.includes(url));

    for (const url of removedUrls) {

        // https://res.cloudinary.com/CLOUD_NAME/image/upload/v1772458374/FOLDER-NAME/FILE-NAME.png

        const urlParts = url.split('/');
        const uploadIndex = urlParts.indexOf('upload');

        const filename = urlParts.slice(uploadIndex + 2).join('/');
        
        // remove extension
        const publicId = filename.replace(/\.[^.]+$/, ''); 

        await cloudinary.uploader.destroy(publicId);
    }

    return removedUrls;
}

export const handleDeleteImage = async (url: string): Promise<string[]> => {
    const cloudinaryUrls = (content: string): string[] => {
        const regex = /https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/[^/]+\/[^"]+/g;
        return content.match(regex) || [];
    }

    const allImageUrls = cloudinaryUrls(url);

    for (const url of allImageUrls) {
        const urlParts = url.split('/');
        const uploadIndex = urlParts.indexOf('upload');

        const filename = urlParts.slice(uploadIndex + 2).join('/');

        const publicId = filename.replace(/\.[^.]+$/, '');

        await cloudinary.uploader.destroy(publicId);
    }

    return allImageUrls;
}
