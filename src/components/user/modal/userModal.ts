// import mongoose, { Schema, Document, Model } from 'mongoose';
// import appString from '../../utils/appString';
// import Enum from '../../utils/enum';



// export interface IUser extends Document {
//     fullName: string;
//     userName: string;
//     email: string;
//     mobileNo: number | string;
//     DOb: Date
//     password: string;
//     isMobileVerified: number;
//     isEmailVarified: number;
//     isDeleted: number;
//     createdAt: Date;
//     updatedAt: Date;
//     emailOtp: number | null;
//     emailOtpExpire: Date | null
//     mobileOtp: number
//     mobileOtpExpire: Date | null

// }


// const userSchema: Schema<IUser> = new Schema(
//     {
//         fullName: { type: String, required: true },
//         userName: { type: String, required: true },
//         email: { type: String, required: true, unique: true },
//         mobileNo: { type: Number, required: true },
//         DOb: { type: Date },
//         password: { type: String, required: true },

//         isEmailVarified: {
//             type: Number,
//             enum: Object.values(Enum.ACCOUNT_VERIFIED),
//             default: Enum.ACCOUNT_VERIFIED.NO
//         },
//         isMobileVerified: {
//             type: Number,
//             enum: Object.values(Enum.ACCOUNT_VERIFIED),
//             default: Enum.ACCOUNT_VERIFIED.NO
//         },
//         isDeleted: {
//             type: Number,
//             enum: Object.values(Enum.IS_DELETED),
//             default: Enum.IS_DELETED.NOT_DELETED
//         },
//         emailOtp: {
//             type: Number,
//             default: null
//         },
//         emailOtpExpire: {
//             type: Date,
//             default: null
//         },
//         mobileOtp: {
//             type: Number,
//             default: null
//         },
//         mobileOtpExpire: {
//             type: Date,
//             default: null
//         },

//          steps: [
//         {
//             stepId: {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: appString.SETTING
//             },
//             data: {
//                 type: mongoose.Schema.Types.Mixed
//             }
//         },
//         { _id: false }
//     ],

//     currentStep: {
//         type: Number
//     },
    
//     },{ timestamps: true }
// );


// const User: Model<IUser> = mongoose.model<IUser>(appString.USER, userSchema);

// export default User;
import mongoose, { Schema, Document, Model } from 'mongoose';
import appString from '../../utils/appString';
import Enum from '../../utils/enum';

interface IStep {
    stepId: mongoose.Types.ObjectId;
    data: any; 
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
    mobileOtp: number ;
    mobileOtpExpire: Date | null;
    steps: mongoose.Types.Array<IStep>; 
}

// 3. Define Schema with TypeScript types
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
    
        steps: [{
            stepId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: appString.SETTING
            },
            data: {
                type: mongoose.Schema.Types.Mixed
            }
        }]
    },
    {
        timestamps: true
    }
);

// 4. Create and Export Model
const User: Model<IUser> = mongoose.model<IUser>(appString.USER, userSchema);
export default User;
