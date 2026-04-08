import mongoose, { Schema, Document, Model } from 'mongoose';
import appString from '../../utils/appString';
// Correct import: assuming enums are exported namedly
import { IsDeleted, AccountVerified } from '../../utils/enum';

export interface IAdmin extends Document {
    fullName: string;
    userName: string;
    email: string;
    mobileNo: number;
    DOb: Date
    password: string;

    isEmailVarified: number;
    isDeleted: number;
    createdAt: Date;
    updatedAt: Date;
}


const adminSchema: Schema<IAdmin> = new Schema(
    {
        fullName: { type: String, required: true },
        userName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        mobileNo: { type: Number, required: true },
        DOb: { type: Date, required: true },
        password: { type: String, required: true },
        
        isEmailVarified: {
            type: Number,
            enum: Object.values(AccountVerified),
            default: AccountVerified.No
        },
        isDeleted: {
            type: Number,
            enum: Object.values(IsDeleted),
            default: IsDeleted.NotDeleted
        }
    },
    { timestamps: true }
);


const Admin: Model<IAdmin> = mongoose.model<IAdmin>(appString.USER, adminSchema);

export default Admin;
