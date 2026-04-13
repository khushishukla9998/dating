import commonUtils from '../../utils/commonUtils';
import appStrings from "../../utils/appString";
import { Request, Response } from 'express';
import Setting from "../modal/settingModal";

const createStep = async (req: Request, res: Response) => {
    try {
        let { stepLevel } = req.body;

        if (!stepLevel || (Array.isArray(stepLevel) && stepLevel.length === 0)) {

        }

        let setting = await Setting.findOne();
        if (setting) {
            setting.stepLevel = stepLevel;
            await setting.save();
        } else {
            setting = new Setting({ stepLevel: stepLevel });
            await setting.save();
        }
        return commonUtils.sendSuccessResponse(req, res, appStrings.STEPS_CONFIG_UPDATED, setting);
    } catch (err:any) {
        return commonUtils.sendErrorResponse(req, res, err.message, null, 500);
    }
};



export default {createStep};
