import Like from "../modal/likeModal";
import commonUtils from '../../utils/commonUtils';
import appStrings from "../../utils/appString";
import User from '../modal/userModal';
import { Request, Response } from 'express';
import Enum from "../../utils/enum";
import Schedule from "../../user/modal/dateScheduleModal";
import smsService from "../../utils/smsService";
import moment from 'moment';

const like = async (req: Request, res: Response) => {
    try {
        const { likedUserId, like, view, userId } = req.body;

        const headerId = req.headers.decode;
        const actionUserId = req.userId || userId || headerId;

        if (!actionUserId || (userId && headerId && userId !== headerId)) {
            return commonUtils.sendErrorResponse(req, res, appStrings.INVALID_USER_ID, null, 400);
        }
        const targetUser = await User.findById(likedUserId);
        if (!targetUser) {
            return commonUtils.sendErrorResponse(req, res, appStrings.LIKED_USER_NOT_FOUND);
        }
        let recordAB = await Like.findOne({ likedByUser: actionUserId, likedUserId: likedUserId });
        if (!recordAB) {
            recordAB = new Like({
                likedByUser: actionUserId,
                likedUserId: likedUserId,
                like: Enum.LIKE.UNLIKED,
                view: Enum.VIEW.UNVIEW,
                matches: Enum.MATCHES.UNMATCH
            });
        }
        if (view !== undefined) {
            recordAB.view = view;
        }
        if (like !== undefined) {
            recordAB.like = like;
        }
        let recordBA = await Like.findOne({ userId: likedUserId, likedUserId: actionUserId });
        let isMatch = false;
        if (recordAB.like === Enum.LIKE.LIKE && recordBA && recordBA.like === Enum.LIKE.LIKE) {
            isMatch = true;
        }
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
        await recordAB.save();

        if (recordBA) {
            await recordBA.save();
        }
        return commonUtils.sendSuccessResponse(req, res, appStrings.ACTION_PROCESSED_SUCCESSFULLY, recordAB);
    } catch (err: any) {
        return commonUtils.sendErrorResponse(req, res, err.message, null, 500);
    }
};

//==============GET DETAILS ABOUT VIEW, LIKE , MATCHES============================//
interface LikeQueryCondition {
    likedUserId: any;
    like?: number;
    view?: number;
    matches?: number;
}
const getdetails = async (req: Request, res: Response) => {
    try {
        const { type } = req.query;
        const userId = req.userId || req.body.userId;

        if (!userId) {
            return commonUtils.sendErrorResponse(req, res, appStrings.INVALID_USER_ID);
        }
        let queryCondition: LikeQueryCondition = { likedUserId: userId };

        switch (type) {
            case 'like':
                queryCondition.like = 1;
                break;
            case 'view':
                queryCondition.view = 1;
                break;
            case 'matches':
                queryCondition.matches = 1;
                break;
            default:

                return commonUtils.sendErrorResponse(req, res, "Invalid or missing filter type. Use 'like', 'view', or 'matches'");
        }
        const data = await Like.find(queryCondition).select('likedByUser -_id').populate('likedByUser', 'fullName');

        const count = await Like.countDocuments(queryCondition);

        const counts = data.length
        if (counts === 0) {

            if (type === 'like') {
                return commonUtils.sendErrorResponse(req, res, appStrings.NO_LIKES_FOUND);
            } else if (type === 'view') {
                return commonUtils.sendErrorResponse(req, res, appStrings.NO_VIEW_FOUNDl);
            } else if (type === 'matches') {
                return commonUtils.sendErrorResponse(req, res, appStrings.NO_MATCHES_FOUND);
            }
            return commonUtils.sendSuccessResponse(req, res, appStrings.DATA_NOT_FOUND, { [type]: [], count: 0 });
        }
        return commonUtils.sendSuccessResponse(req, res, appStrings.LIKE_DATA, {
            [type]: data,
            count: count
        });

    } catch (err: any) {
        return commonUtils.sendErrorResponse(req, res, err.message);
    }
}

//========================SCHEDULE DATES REQUEST ==============================//

export const createSchedule = async (req: Request, res: Response) => {
    try {
        const { requestDateBy, dateMember, date, time, lng, lat, message, panicMode } = req.body;

        if (!lng || !lat || !dateMember) {
            return res.status(400).json({ message: "Location and date member are required" });
        }

        const scheduleMoment = date ? moment(date) : moment();
        const formattedDate = scheduleMoment.format('YYYY/MM/DD');
        const scheduleMomentTime = time ? moment(time, 'hh:mm a') : moment()

        if (panicMode === Enum.PANIC_MODE.ON) {
            try {
                const user = await User.findById(requestDateBy);

                if (user && user.panicMobileNumber && user.panicMessage) {

                    await smsService.sendPanicMessage(user.panicMobileNumber, user.panicMessage);
                    console.log(`Panic SMS sent to ${user.panicMobileNumber}`);
                }
            } catch (smsError) {

                console.error("Failed to send SMS:", smsError);
            }
        }
        const newSchedule = new Schedule({
            requestDateBy,
            dateMember,
            date: formattedDate,
            time: scheduleMomentTime,
            location: { type: 'Point', coordinates: [lng, lat], },
            message,
            panicMode: panicMode
        });

        const savedSchedule = await newSchedule.save();
        return res.status(201).json({
            message: "Schedule created successfully",
            data: savedSchedule
        });
    } catch (error) {
        return res.status(500).json({ message: "Error creating schedule", error });
    }
};

//========================SCHEDULE DATES RESPONSE(accept reject ) ==============================//

const handleScheduleRequest = async (req: Request, res: Response) => {
    try {
        const { scheduleId, response } = req.body;
        const userId = req.userId || req.body.userId;
        if (!scheduleId || response === undefined) {
            return commonUtils.sendErrorResponse(req, res, "Invalid request data");
        }
        if (!userId) {

            return commonUtils.sendErrorResponse(req, res, "User ID missing");
        }

        const updatedSchedule = await Schedule.findByIdAndUpdate({ _id: scheduleId }, { $set: { response: response } }, { new: true }
        );
        console.log("Updated:", updatedSchedule);

        if (!updatedSchedule) {
            return commonUtils.sendErrorResponse(req, res, appStrings.SCHEDULE_ID_NOT_FOUND);
        }
        return commonUtils.sendErrorResponse(req, res, appStrings.SCHEDULE_UPDATED, updatedSchedule);
    } catch (err: any) {
        return commonUtils.sendErrorResponse(req, res, err.message);
    }
};

//============= experienc and rating =============================//

const rating = async (req: Request, res: Response) => {
    try {
        const { scheduleId, rating, experience } = req.body;
        const userId = req.userId || req.body.userId;
        if (!scheduleId || !rating || experience === undefined) {
            return commonUtils.sendErrorResponse(req, res, "Invalid request data");
        }
        if (!userId) {
            return commonUtils.sendErrorResponse(req, res, "User ID missing");
        }
        const schedule = await Schedule.findById(scheduleId);
        if (!schedule) {
            return commonUtils.sendErrorResponse(req, res, "Schedule not found");
        }
        let updateFields: any = {};

        if (schedule.response !== Enum.RESPONSE.ACCEPT) {
            return commonUtils.sendErrorResponse(req, res, appStrings.NOT_DATED)
        }

        else {
            if (userId === schedule.requestDateBy.toString()) {
                updateFields = {
                    RquesterRating: rating,
                    RquesterExperience: experience,
                    requesterRatingStatus: Enum.RATING_STATUS.COMPLETED
                };
            } else if (userId === schedule.dateMember.toString()) {
                updateFields = {
                    dateMemberRating: rating,
                    dateMemberExperience: experience,
                    dateMemberRatingStatus: Enum.RATING_STATUS.COMPLETED
                };
            } else {
                return commonUtils.sendErrorResponse(req, res, "User not authorized to rate this schedule");
            }

            const updatedSchedule = await Schedule.findByIdAndUpdate(
                scheduleId,
                { $set: updateFields },
                { new: true }
            );
            console.log("Updated:", updatedSchedule);

            await User.findByIdAndUpdate(
                userId,
                { $inc: { points: 100 } } 
            );
            console.log(`100 points added to user: ${userId}`);
        }

    } catch (error: any) {
        console.error("Error updating rating:", error);
        return commonUtils.sendErrorResponse(req, res, error.message);
    }
};

export default { like, getdetails, createSchedule, handleScheduleRequest, rating }
