import User from '../modal/userModal';
import { Request, Response } from 'express';
import Enum from '../../utils/enum';
import commonUtils from '../../utils/commonUtils';
import appStrings from '../../utils/appString';
import Entertainment from '../modal/entertainmentModal';

import multer from 'multer';
const upload = multer({ dest: 'uploads/videos/' });



const postEntertainmentVideo = async (req:Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const videoFile = req.file;
        const userId = req.userId as string;;
        const user = await User.findById(userId);
        if (!user) {
            return commonUtils.sendErrorResponse(req, res, appStrings.USER_NOT_FOUND);
        }
        if (!videoFile) {
            return res.status(400).json({ message: 'No video file uploaded' });
        }

        const file =req.file as Express.Multer.File;
        // const thumbnailName = await commonUtils.generateThumbnail(file.path );

        const newVideo = await Entertainment.create({
            userId :userId,
            title: title,
            description: description,
            videoUrl: videoFile.path,
            // thumbnailUrl: `uploads/thumbnails/${thumbnailName}`
        });
        return res.status(201).json(newVideo);
    } catch (error) {
        console.error("Error in postEntertainmentVideo:", error);
        return res.status(500).json({ 
            message: 'Error processing video', 
            error: error instanceof Error ? error.message : error 
        });
    }
};
export default {postEntertainmentVideo};

