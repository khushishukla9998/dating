import commonUtils from '../../utils/commonUtils';
import appStrings from "../../utils/appString";
import User from '../modal/userModal';
import { Request, Response } from 'express';
import Setting from '../modal/settingModal';

export const fillStep = async (req: Request, res: Response) => {
  try {
    const userId = req.userId || req.body.userId;
    const { stepData, stepNumber, settingiD } = req.body;

    if (!userId) {
      return res.status(401).json({ message: appStrings.UNAUTHORIZED_USER_ID_MISSING });
    }
    if (!settingiD) {
      return res.status(400).json({ message: appStrings.SETTING_ID_MISSING });
    }

    const setting = await Setting.findById(settingiD);
    console.log("Setting found:", setting);

    if (!setting) {
      return res.status(404).json({ message: appStrings.SETTING_NOT_FOUND });
    }


const targetStepKey = `step${stepNumber}`;
const stepExists = setting.stepLevel.some((s: any) => targetStepKey in s);

console.log("Looking for key:", targetStepKey);
    console.log("steps", setting.stepLevel)
    console.log("stepExist", stepExists)

    if (!stepExists) {
      return res.status(400).json({
        message: appStrings.STEP_NOT_ALLOWED
      });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: appStrings.USER_NOT_FOUND });

    // Validate sequential step filling
    const requestedStep = Number(stepNumber);
    if (requestedStep > 1) {
      const existingSteps = new Set((user.steps || []).map(s => s.step));
      for (let i = 1; i < requestedStep; i++) {
        if (!existingSteps.has(i)) {
          return res.status(400).json({ 
            message: appStrings.COMPLETE_PREVIOUS_STEP 
          });
        }
      }
    }
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

    await User.findByIdAndUpdate(userId, { currentStep: stepNumber });
    await user.save();

    res.status(200).json({ message: appStrings.STEP_UPDATED_SUCCESSFULLY, steps: user.steps });

  } catch (err: any) {
    return commonUtils.sendErrorResponse(req, res, err.message, null, 500);
  }
};
export default { fillStep }