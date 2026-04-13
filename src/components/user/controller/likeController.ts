import Like from "../modal/likeModal";
import commonUtils from '../../utils/commonUtils';
import appStrings from "../../utils/appString";
import User from '../modal/userModal';
import { Request, Response } from 'express';
import Enum from "../../utils/enum";


const like = async (req: Request, res: Response) => {
    try {
        const { likedUserId, like, matches, view,userId } = req.body;
 
     const headerId = req.headers.decode; 
     
        console.log(headerId)
        
        if (!userId || userId !== headerId) {
            return commonUtils.sendErrorResponse(req, res, "Invalid user ID", null, 400);
        }

        const user = await User.findById(likedUserId);
        if (!user) {
            return commonUtils.sendErrorResponse(req, res, "user not found");
        }
        const data = await Like.create({
            userId: userId as string, 
            likedUserId: likedUserId,
            like: like,
            view: view,
            matches: matches
        });
        return commonUtils.sendSuccessResponse(req, res, "created successfully", data);
    } catch (err: any) {
        return commonUtils.sendErrorResponse(req, res, err.message, null, 500);
    }
};
export default { like };


