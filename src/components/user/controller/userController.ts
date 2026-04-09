import appString from "../../utils/appString";
import { generateAccessToken, generateRefreshToken, verifyAcessToken, verifyRefreshToken } from "../../../middelware/index";
import commonUtils from '../../utils/commonUtils';
import appStrings from "../../utils/appString";
import bcrypt from "bcrypt"
import User from '../modal/userModal';
import { Request, Response } from 'express';
import Enum from "../../utils/enum";
import sendVerificationEmail from "../../utils/emailService";
import sendOtp from "../../utils/smsService";



//========= MOBILE NOUBER FORMMETTER FUNCTON=========\\

function normalizeIndianMobile(mobileNo: Number) {
    if (!mobileNo) {
        throw new Error(appStrings.MOBILE_NUMBER_REQUIRED);

    }

    let str = mobileNo.toString().trim();
    // Strip all non-digits
    str = str.replace(/\D/g, "");
    // Handle common Indian prefixes
    if (str.length === 12 && str.startsWith("91")) {
        str = str.slice(2);
    } else if (str.length === 13 && str.startsWith("0")) {
        // Some might use 091...
        str = str.slice(3);
    } else if (str.length === 11 && str.startsWith("0")) {
        str = str.slice(1);
    }

    if (str.length !== 10) {
        throw new Error(
            appStrings.INVALID_MOBILE_FORMAT,
        );
    }

    return str;
}


//==================================== REGISTER ================================//

console.log("register is loading ")
const register = async (req: Request, res: Response) => {
    try {
        const { fullName, userName, email, mobileNo, DOb, password, confirmPassword } = req.body;
        if (!fullName || !userName || !email || !password || !DOb || !confirmPassword || !mobileNo) {
            return commonUtils.sendErrorResponse(req, res, "All fields (including confirmPassword) are required", null, 400);
        }
        if (!email || !password) {
            return commonUtils.sendErrorResponse(req, res, "Email and Password required", null, 400);
        }
        if (confirmPassword !== password) {
            return commonUtils.sendErrorResponse(req, res, "Passwords do not match", null, 400);
        }

        const emailInUse = await User.findOne({ email });
        if (emailInUse) {
            return commonUtils.sendErrorResponse(
                req,
                res,
                appStrings.EMAIL_USE,
                null,
                409,
            );
        }
        const hashpass = await bcrypt.hash(password, 10);
        const user = new User({
            fullName,
            userName,
            email,
            mobileNo,
            DOb,
            password: hashpass,
        });
        await user.save();

        // ============ email registration ============== //
        let emailOtp;
        if (email) {
            emailOtp = Math.floor(100000 + Math.random() * 900000);
            user.emailOtp = emailOtp;
            const dte = new Date(Date.now() + 5 * 60 * 1000)
            user.emailOtpExpire = dte; // 5 min
        }
        if (email) {
            try {
                await sendVerificationEmail(email, emailOtp as Number);
            } catch (e) {
                console.error("Error sennding verificatio email:", e);
            }
        }
        // ============ phone registration ============== //

        let formattedMobileForSms: string | undefined;

        if (mobileNo) {
            try {
                const formattedMobile = normalizeIndianMobile(mobileNo);
                user.mobileNo = formattedMobile;
                formattedMobileForSms = `+91${formattedMobile}`;
            } catch (e: any) {
                console.error("Mobile normalization error:", e.message);
                return commonUtils.sendErrorResponse(req, res, e.message);
            }
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        user.mobileOtp = otp;
        const dte = new Date(Date.now() + 5 * 60 * 1000)
        user.mobileOtpExpire = dte;


        const newUser = await User.create(user);

        if (formattedMobileForSms && newUser.mobileNo) {
            try {
                console.log("Sending OTP to:", formattedMobileForSms, "otp:", newUser.mobileOtp);
                await sendOtp(formattedMobileForSms, newUser.mobileOtp);
            } catch (e) {
                console.error("Error sending OTP via Twilio:", e);
                return commonUtils.sendErrorResponse(
                    req,
                    res,
                    appStrings.OTP_FAILED_CONTACT
                );
            }
        }
        //access token and refresh token
        const accessToken = generateAccessToken({ id: user._id, type: "USER" });
        const refreshToken = generateRefreshToken({ id: user._id, type: "USER" });

        commonUtils.storeAcessTokenInCookie(res, accessToken);
        commonUtils.storeRefreshTokenInCookie(res, refreshToken);

        return commonUtils.sendSuccessResponse(
            req,
            res,
            appStrings.REGISTRATION_SUCCESS,
            {
                user: { fullName, userName, email, mobileNo, DOb, emailOtp, mobileOtp: otp },
                accessToken,
                refreshToken,
            },
        );
    } catch (err: any) {
        console.error(appStrings.REGISTRATION_ERROR, err);
        return commonUtils.sendErrorResponse(
            req,
            res,
            appStrings.REGISTRATION_FAILED,
            { error: err.message },
            500,
        );
    }
};


//============================ LOGIN  ==========================================//
// ------------------ user can login wit mobile/email ------------------

const userLogin = async (req: Request, res: Response) => {
    try {
        const { email, mobileNo, password } = req.body;

        const user = await User.findOne({ email: email })

        console.log(user)
        if (!user) {
            return commonUtils.sendSuccessResponse(req, res, appStrings.USER_NOT_FOUND)
        }

        const mobile = user.mobileNo
        if (!mobile) {
            return commonUtils.sendErrorResponse(req, res, appStrings.MOBILE_NOT_FOUND)
        }


        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return commonUtils.sendErrorResponse(req, res, appStrings.WRONG_PASSWORD);
        }

        if (req.body.identifierType === email) {
            if (user.email && user.isEmailVarified === Enum.ACCOUNT_VERIFIED.NO) {
                return commonUtils.sendErrorResponse(req, res, appStrings.VERIFY_EMAIL_FIRST, null);
            }
            console.log("...................", user.email);
            console.log("...................", user.isEmailVarified);
        }
        else if (req.body.identifierType === mobileNo)
            if (user.mobileNo && user.isMobileVerified === Enum.ACCOUNT_VERIFIED.NO) {
                return commonUtils.sendErrorResponse(req, res, appStrings.VERIFY_MOBILE_FIRST, null);

            }
        console.log("...................", user.mobileNo);
        console.log("...................", user.isMobileVerified);


        const accessToken = generateAccessToken({
            id: user._id,
            type: "USER",
        });
        const refreshToken = generateRefreshToken({
            id: user._id,
            type: "USER",
        });

        commonUtils.storeAcessTokenInCookie(res, accessToken);
        commonUtils.storeRefreshTokenInCookie(res, refreshToken);

        return commonUtils.sendSuccessResponse(req, res, appStrings.LOGIN_SUCCESS, {
            user: {
                id: user._id,
                name: user.fullName,
                email: user.email,
                mobileNo: user.mobileNo,
                isDeleted: Enum.IS_DELETED.NOT_DELETED
            },
            accessToken,
            refreshToken,
        });
    }
    catch (err: any) {
        console.log(err.message)
        return commonUtils.sendErrorResponse(req, res, err.message);
    }
}

///=================== VERIFY EMAIL/ MOBILE OTP =======================//

const verifyEmailOtp = async (req: Request, res: Response) => {
    try {
        const { email, emailotp, mobileNo, mobileotp } = req.body;

        if (!email || !emailotp) {
            return commonUtils.sendErrorResponse(
                req,
                res,
                appStrings.EMAIL_OTP_REQUIRED);
        }

        if (!mobileNo || !mobileotp) {
            return commonUtils.sendErrorResponse(
                req,
                res,
                appStrings.MOBILE_OTP_REQUIRED,
            );
        }

        const user = await User.findOne({ email, mobileNo });
        if (!user) {
            return commonUtils.sendErrorResponse(req, res, appStrings.USER_NOT_FOUND);
        }
        if (!user.emailOtp || !user.emailOtpExpire || user.emailOtpExpire.getTime() < Date.now()) {
            return commonUtils.sendErrorResponse(req, res, appStrings.OTP_EXPIRED);
        }
        if (user.emailOtp !== emailotp) {
            return commonUtils.sendErrorResponse(req, res, appStrings.INVALID_OTP);
        }
        user.isEmailVarified = Enum.ACCOUNT_VERIFIED.YES;
        user.emailOtp = null;
        user.emailOtpExpire = null;

        if (!user.mobileOtp || !user.mobileOtpExpire || user.mobileOtpExpire.getTime() < Date.now()) {
            return commonUtils.sendErrorResponse(req, res, appStrings.OTP_EXPIRED);
        }

        if (user.mobileOtp !== mobileotp) {
            return commonUtils.sendErrorResponse(req, res, appStrings.INVALID_OTP);
        }
        user.isMobileVerified = Enum.ACCOUNT_VERIFIED.YES
        // user.mobileOtp = null;
        user.mobileOtpExpire = null;

        await user.save();

        return commonUtils.sendSuccessResponse(req, res, appStrings.EMAIL_VERIFIED);
    } catch (err: any) {
        console.log(err)
        return commonUtils.sendErrorResponse(req, res, err.message);
    }
};



//====================== FORGOT PASSWORD ==========================//

const fotgotPassword = async (req:Request, res:Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return commonUtils.sendErrorResponse(req, res, appString.USER_NOT_FOUND, null, 400);
    }
    let emailOtp;
        if (email) {
            emailOtp = Math.floor(100000 + Math.random() * 900000);
            user.emailOtp = emailOtp;
            const dte = new Date(Date.now() + 5 * 60 * 1000)
            user.emailOtpExpire = dte; // 5 min
        }
        if (email) {
            try {
                await sendVerificationEmail(email, emailOtp as Number);
            } catch (e) {
                console.error("Error sennding verificatio email:", e);
            }
        }
    

    return commonUtils.sendSuccessResponse(req, res, appString.OTP_SENT_SUCCESS);
  } catch (err:any) {
    return commonUtils.sendErrorResponse(req, res, appString.OTP_SEND_FAILED, { error: err.message }, 500);
  }
};

//====================== RESET PASSWORD ==========================//

const resetPassword = async (req:Request, res:Response) => {
  try {
    const { email, emailOtp, oldPassword, newPassword, confirmPassword } = req.body;
  

    if (newPassword !== confirmPassword) {
      return commonUtils.sendErrorResponse(req, res, appString.PASSWORD_MISMATCH, null, 400);
    }


    if (newPassword === oldPassword) {
      return commonUtils.sendErrorResponse(req, res, appString.PASSWORD_MATCH, null, 400);
    }

    const otpData = await User.findOne({
      email,
   
    
    });

    if (!otpData) {
      return commonUtils.sendErrorResponse(req, res, appString.OTP_NOT_VERFIFIED, null, 400);
    }
    const user = await User.findOne({email:email} );
    if (!user) {
      return res.status(400).json({
        success: false,
        message: appString.USER_NOT_FOUND,
      });
    }

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return commonUtils.sendErrorResponse(req, res, appString.INCORRECT_OLD_PASSWORD, null, 400);
    }

    // Hash new password
    const hashPass = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(user._id, {
      password: hashPass,
    });

    // delete used otp
    // await emailOtp.deleteOne({ _id: otpData._id });

    return commonUtils.sendSuccessResponse(req, res, appString.PAASWORD_RESET_SUCCESS);
  } catch (err:any) {
    return commonUtils.sendErrorResponse(req, res, appString.PASSWORD_RESET_FAILED, { error: err.message }, 500);
  }
};
export default { register, userLogin, verifyEmailOtp,resetPassword ,fotgotPassword};