import commonUtils from '../../utils/commonUtils';
import appStrings from "../../utils/appString";
import User from '../modal/userModal';
import { Request, Response } from 'express';
import Enum from "../../utils/enum";
import Setting, { ISteps } from "../modal/settingModal";
import mongoose from 'mongoose';

export const fillStep = async (req: Request, res: Response) => {
  try {
    const userId = req.userId || req.body.userId;
    const { stepData, stepNumber } = req.body;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: User ID missing" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: appStrings.USER_NOT_FOUND });

    // Explicitly parse incoming multipart file boundaries
    if (stepNumber == 9 && Array.isArray(stepData.photos)) {
        stepData.photos = stepData.photos.map((file: any) => file.filename || file);
    }

    if (!user.steps) {
        user.steps = [] as any;
    }

    const stepIndex = user.steps!.findIndex(s => s.step === Number(stepNumber));

    if (stepIndex > -1) {
        const existingStep = user.steps![stepIndex];
        if (existingStep) {
            existingStep.value = stepData;
            user.markModified(`steps.${stepIndex}.value`);
        }
    } else {
        user.steps!.push({
            step: Number(stepNumber),
            value: stepData
        } as any);
    }

    await user.save();

    res.status(200).json({ message: appStrings.STEP_UPDATED_SUCCESSFULLY, steps: user.steps });

   } catch (err:any) {
        return commonUtils.sendErrorResponse(req, res, err.message, null, 500);
   }
};
     export default {fillStep}