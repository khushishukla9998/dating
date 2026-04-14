import Like from "../modal/likeModal";
import commonUtils from '../../utils/commonUtils';
import appStrings from "../../utils/appString";
import User from '../modal/userModal';
import { Request, Response } from 'express';
import Enum from "../../utils/enum";

const like = async (req: Request, res: Response) => {
    try {
        const { likedUserId, like, view, userId } = req.body;
 
        // We will authenticate the doer mapping 'userId' to 'req.userId' if available, or header decode
        const headerId = req.headers.decode; 
        const actionUserId = req.userId || userId || headerId;
        
        if (!actionUserId || (userId && headerId && userId !== headerId)) {
            return commonUtils.sendErrorResponse(req, res, appStrings.INVALID_USER_ID, null, 400);
        }

        const targetUser = await User.findById(likedUserId);
        if (!targetUser) {
            return commonUtils.sendErrorResponse(req, res, appStrings.LIKED_USER_NOT_FOUND);
        }

        // 1. Find or create the action document (User A -> User B)
        let recordAB = await Like.findOne({ userId: actionUserId, likedUserId: likedUserId });
        if (!recordAB) {
            recordAB = new Like({
                userId: actionUserId,
                likedUserId: likedUserId,
                like: Enum.LIKE.UNLIKED,
                view: Enum.VIEW.UNVIEW,
                matches: Enum.MATCHES.UNMATCH
            });
        }

        // 2. Update view or like values if provided in request
        if (view !== undefined) {
            recordAB.view = view;
        }
        if (like !== undefined) {
            recordAB.like = like;
        }

        // 3. Find the reverse document (User B -> User A) to check for mutual matches
        let recordBA = await Like.findOne({ userId: likedUserId, likedUserId: actionUserId });

        // 4. Determine match status: Check if BOTH like each other
        let isMatch = false;
        if (recordAB.like === Enum.LIKE.LIKE && recordBA && recordBA.like === Enum.LIKE.LIKE) {
            isMatch = true;
        }

        // 5. Update matches on both sides
        if (isMatch) {
            recordAB.matches = Enum.MATCHES.MATCH;
            if (recordBA) {
                recordBA.matches = Enum.MATCHES.MATCH;
            }
        } else {
            recordAB.matches = Enum.MATCHES.UNMATCH;
            if (recordBA) {
                recordBA.matches = Enum.MATCHES.UNMATCH;
            }
        }

        // 6. Save both documents
        await recordAB.save();
        if (recordBA) {
            await recordBA.save();
        }

        return commonUtils.sendSuccessResponse(req, res, appStrings.ACTION_PROCESSED_SUCCESSFULLY, recordAB);

    } catch (err: any) {
        return commonUtils.sendErrorResponse(req, res, err.message, null, 500);
    }
};

export default { like };
