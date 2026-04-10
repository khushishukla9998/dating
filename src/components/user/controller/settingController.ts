import commonUtils from '../../utils/commonUtils';
import appStrings from "../../utils/appString";
import User from '../modal/userModal';
import { Request, Response } from 'express';
import Enum from "../../utils/enum";
import Setting from "../modal/settingModal";



const createStep = async (req: Request, res: Response) => {
    try {
        const { stepLevel } = req.body;

        let setting = await Setting.findOne();
        if (setting) {
            if (stepLevel) setting.stepLevel = stepLevel;
            await setting.save();
        } else {
            setting = new Setting({ stepLevel: stepLevel });
            await setting.save();
        }
        return commonUtils.sendSuccessResponse(req, res, "Steps updated", setting);
    } catch (err:any) {
        return commonUtils.sendErrorResponse(req, res, err.message, null, 500);
    }
};



export default {createStep};
