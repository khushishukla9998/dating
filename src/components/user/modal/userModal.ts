
import mongoose, { Schema, Document, Model } from 'mongoose';
import appString from '../../utils/appString';
import Enum from '../../utils/enum';

interface IStep {
    step: number;
    value: any;
}

export interface IUser extends Document {
    fullName: string;
    userName: string;
    email: string;
    mobileNo: string;
    DOb?: Date;
    password: string;
    isMobileVerified: number;
    isEmailVarified: number;
    isDeleted: number;
    emailOtp: number | null;
    emailOtpExpire: Date | null;
    mobileOtp: number;
    mobileOtpExpire: Date | null;
    currentStep: string;
    steps: mongoose.Types.Array<IStep>;
    panicMobileNumber?: string;
    panicMessage?: string;
    points:number;
}


const userSchema: Schema<IUser> = new Schema(
    {
        fullName: { type: String, required: true },
        userName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        mobileNo: { type: String, required: true },
        DOb: { type: Date },
        password: { type: String, required: true },

        isEmailVarified: {
            type: Number,
            enum: Object.values(Enum.ACCOUNT_VERIFIED),
            default: Enum.ACCOUNT_VERIFIED.NO
        },
        isMobileVerified: {
            type: Number,
            enum: Object.values(Enum.ACCOUNT_VERIFIED),
            default: Enum.ACCOUNT_VERIFIED.NO
        },
        isDeleted: {
            type: Number,
            enum: Object.values(Enum.IS_DELETED),
            default: Enum.IS_DELETED.NOT_DELETED
        },
        emailOtp: {
            type: Number,
            default: null
        },
        emailOtpExpire: {
            type: Date,
            default: null
        },
        mobileOtp: {
            type: Number,
            default: null
        },
        mobileOtpExpire: {
            type: Date,
            default: null
        },
        currentStep: {
            type: "string"
        },

        steps: [{
            step: {
                type: Number
            },
            value: {
                type: mongoose.Schema.Types.Mixed
            }

        }, { _id: false }
        ],
        panicMobileNumber: {
            type: String,
            default: null
        },
        panicMessage: {
            type: String,
            default: null
        },
        points:{
            type:Number
        }
    },
    {
        timestamps: true
    }
);
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
