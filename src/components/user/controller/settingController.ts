import commonUtils from '../../utils/commonUtils';
import appStrings from "../../utils/appString";
import User from '../modal/userModal';
import { Request, Response } from 'express';
import Enum from "../../utils/enum";
import Setting from "../modal/settingModal";



const defaultSteps = [{
    step1: { key: "Role and Relationship", isRequired: 1, fields: { role: { isRequired: 1, type: "string" }, lookingFor: { isRequired: 1, type: "string" }, relationshipStatus: { isRequired: 1, type: "string" }, children: { isRequired: 1, type: "string" } } },
    step2: { key: "Location", isRequired: 1, fields: { city: { isRequired: 1, type: "string" } } },
    step3: { key: "Interests and Hobbies", isRequired: 1, fields: { interests: { isRequired: 1, type: "array" }, hobbies: { isRequired: 1, type: "array" } } },
    step4: { key: "About you", isRequired: 1, fields: { handicap: { isRequired: 1, type: "boolean" }, aboutYou: { isRequired: 1, type: "string" }, lookingForText: { isRequired: 1, type: "string" }, annualIncome: { isRequired: 1, type: "number" } } },
    step5: { key: "Ethnicity", isRequired: 1, fields: { ethnicity: { isRequired: 1, type: "string" }, religion: { isRequired: 1, type: "string" } } },
    step6: { key: "Horoscope", isRequired: 1, fields: { horoscope: { isRequired: 1, type: "string" } } },
    step7: { key: "Hiring", isRequired: 1, fields: { availableForHiring: { isRequired: 1, type: "boolean" }, searchCategory: { isRequired: 1, type: "array" }, availableDistance: { isRequired: 1, type: "number" } } },
    step8: { key: "Sexual Orientation", isRequired: 1, fields: { sexualOrientation: { isRequired: 1, type: "string" } } },
    step9: { key: "Photos", isRequired: 1, fields: { photos: { isRequired: 1, type: "array" } } },
    step10: { key: "Persona", isRequired: 1, fields: { whichOneAreYou: { isRequired: 1, type: "string" } } }
}];

const createStep = async (req: Request, res: Response) => {
    try {
        let { stepLevel } = req.body;

        if (!stepLevel || (Array.isArray(stepLevel) && stepLevel.length === 0)) {
            stepLevel = defaultSteps;
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
