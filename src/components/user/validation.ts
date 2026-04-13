import { Request, Response } from 'express';
import commonUtils from '../utils/commonUtils';
import Enum from '../utils/enum';

const stepValidation = (req: Request, res: Response, next: any) => {
    if (!req.body) {
        req.body = {};
    }

    if (!req.body.stepData) {
        req.body.stepData = {};
    } else if (typeof req.body.stepData === 'string') {
        try {
            req.body.stepData = JSON.parse(req.body.stepData);
        } catch (e) { }
    }

    const files = (req as any).files;
    if (files && Array.isArray(files) && files.length > 0) {
        req.body.stepData.photos = files;
    }

    let validationRule: any = {
        stepNumber: "required|numeric",
    };

    if (req.body.stepNumber == 1) {
        validationRule["stepData.role"] = `required|string|in:${Object.values(Enum.ROLE).join(',')}`;
        validationRule["stepData.lookingFor"] = `required|string|in:${Object.values(Enum.ROLE).join(',')}`;
        validationRule["stepData.relationshipStatus"] = `required|string|in:${Object.values(Enum.RELATIONSHIP_STATUS).join(',')}`;
        validationRule["stepData.children"] = `required|string|in:${Object.values(Enum.CHILDREN_STATUS).join(',')}`;
    }
    else if (req.body.stepNumber == 2) {
        validationRule["stepData.country"] = "required|string";
        validationRule["stepData.city"] = "required|string";
    }
    else if (req.body.stepNumber == 3) {
        validationRule["stepData.interests"] = `required|array|in:${Object.values(Enum.INTRESTS).join(',')}`;
        validationRule["stepData.hobbies"] = `required|array|in:${Object.values(Enum.HOBBIES).join(',')}`;
    }
    else if (req.body.stepNumber == 4) {
        validationRule["stepData.handicap"] = `required|string|in:${Object.values(Enum.HANDICAP).join(',')}`;
        validationRule["stepData.aboutYou"] = "required|string";
        validationRule["stepData.lookingForText"] = "required|string";
        validationRule["stepData.annualIncome"] = "required|numeric";
    }
    else if (req.body.stepNumber == 5) {
        validationRule["stepData.ethnicity"] = `required|string|in:${Object.values(Enum.ETHNICITY).join(',')}`;
    }
    else if (req.body.stepNumber == 6) {
        validationRule["stepData.horoscope"] = `required|string|in:${Object.values(Enum.HOROSCOPE).join(',')}`;
    }
    else if (req.body.stepNumber == 7) {
        validationRule["stepData.availableForHiring"] = "required|boolean";
        validationRule["stepData.category"] = `required|array|in:${Object.values(Enum.CATEGORY).join(',')}`;
        validationRule["stepData.availableDistance"] = "required|numeric";
    }
    else if (req.body.stepNumber == 8) {
        validationRule["stepData.sexualOrientation"] = `required|array|in:${Object.values(Enum.SEXUAL_ORIENTATION).join(',')}`;
    }
    else if (req.body.stepNumber == 9) {
        validationRule["stepData.photos"] = "required|array|min:3|max:6";
    }
    else if (req.body.stepNumber == 10) {
        validationRule["stepData.whichOneAreYou"] = `required|string|in:${Object.values(Enum.PERSONA).join(',')}`;
    }

    const customMessages = {
        'in.stepData.role': `Mismatch option! You must select one of: ${Object.values(Enum.ROLE).join(', ')}`,
        'in.stepData.lookingFor': `Mismatch option! You must select one of: ${Object.values(Enum.ROLE).join(', ')}`,
        'in.stepData.relationshipStatus': `Wrong option! Allowed values are: ${Object.values(Enum.RELATIONSHIP_STATUS).join(', ')}`,
        'in.stepData.children': `Wrong option! Allowed values are: ${Object.values(Enum.CHILDREN_STATUS).join(', ')}`,
        'in.stepData.horoscope': `Wrong option! Horoscope must be one of: ${Object.values(Enum.HOROSCOPE).join(', ')}`,
        'in.stepData.sexualOrientation': `Mismatch option! Orientation must be one of: ${Object.values(Enum.SEXUAL_ORIENTATION).join(', ')}`,
        'in.stepData.whichOneAreYou': `Mismatch option! Persona must be one of: ${Object.values(Enum.PERSONA).join(', ')}`,
        'in.stepData.interests': `Mismatch option! Intrests must be one of:${Object.values(Enum.INTRESTS).join(',')} `,
        'in.stepData.hobbies': `Mismatch option! Hobbies -> must be one of:${Object.values(Enum.HOBBIES).join(',')} `,
        'in.stepData.handicap': `Mismatch option! handicap-> must be one of->: ${Object.values(Enum.HANDICAP).join(',')} `,
       'in.stepData.ethnicity': `Mismatch option! ethnicity-> must be one of->: ${Object.values(Enum.ETHNICITY).join(',')} `,
       'in.stepData.category': `Mismatch option! category-> must be one of->: ${Object.values(Enum.CATEGORY).join(',')} `,


    };

    commonUtils.validatorUtilWithCallback(req, res, next, validationRule, customMessages);
};

const registerValidation = (req: Request, res: Response, next: any) => {
    const rules = {
        fullName: "required|string",
        userName: "required|string",
        email: "required|email",
        mobileNo: "required|string",
        DOb: "required|date",
        password: "required|string|min:6",
        confirmPassword: "required|string|same:password"
    };
    commonUtils.validatorUtilWithCallback(req, res, next, rules);
};

const loginValidation = (req: Request, res: Response, next: any) => {
    const rules = {
        email: "required_without:mobileNo|email",
        mobileNo: "required_without:email|string",
        password: "required|string",
    };
    commonUtils.validatorUtilWithCallback(req, res, next, rules);
};

const verifyOtpValidation = (req: Request, res: Response, next: any) => {
    const rules = {
        email: "required|email",
        emailotp: "required|numeric",
        mobileNo: "required|string",
        mobileotp: "required|numeric",
    };
    commonUtils.validatorUtilWithCallback(req, res, next, rules);
};

const forgotPasswordValidation = (req: Request, res: Response, next: any) => {
    const rules = {
        email: "required|email",
    };
    commonUtils.validatorUtilWithCallback(req, res, next, rules);
};

const resetPasswordValidation = (req: Request, res: Response, next: any) => {
    const rules = {
        email: "required|email",
        oldPassword: "required|string",
        newPassword: "required|string|min:6",
        confirmPassword: "required|string|same:newPassword"
    };
    commonUtils.validatorUtilWithCallback(req, res, next, rules);
};

export default {
    stepValidation,
    registerValidation,
    loginValidation,
    verifyOtpValidation,
    forgotPasswordValidation,
    resetPasswordValidation
};
