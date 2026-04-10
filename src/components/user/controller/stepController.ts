import commonUtils from '../../utils/commonUtils';
import appStrings from "../../utils/appString";
import User from '../modal/userModal';
import { Request, Response } from 'express';
import Enum from "../../utils/enum";
import Setting, { ISteps } from "../modal/settingModal";
import mongoose from 'mongoose';

export const fillStep = async (req: Request, res: Response) => {
  try {
    const { userId, stepSettingId, stepData } = req.body;

    const settingRule = await Setting.findById(stepSettingId);
    if (!settingRule) {
      return res.status(404).json({ message: "Step setting not found" });
    }


const firstStepItem = settingRule.stepLevel?.ISteps?.[0]; 
const stepKey = 'step1'; 
const fieldsRules = firstStepItem?.[stepKey]?.fields || {};

if (!fieldsRules || Object.keys(fieldsRules).length === 0) {
    return res.status(404).json({ message: "Step rules configuration missing in database" });
}
    
    for (const fieldKey in fieldsRules) {
        if (fieldsRules[fieldKey].isRequired && !stepData[fieldKey]) {
            return res.status(400).json({ message: `Field ${fieldKey} is required` });
        }
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

 const stepIndex = user.steps.findIndex(s => s.stepId.toString() === stepSettingId);

    if (stepIndex > -1) {
    user.steps[stepIndex].data = stepData;
    } else {
      user.steps.push({
        stepId: new mongoose.Types.ObjectId(stepSettingId),
        data: stepData
      });
    }

    await user.save();

    res.status(200).json({ message: "Step updated successfully", steps: user.steps });

   } catch (err:any) {
          return commonUtils.sendErrorResponse(req, res, err.message, null, 500);
      }
};
     export default {fillStep}