
import mongoose, { Schema, Document, Model } from 'mongoose';
import appString from '../../utils/appString';
import Enum from '../../utils/enum';

export interface ILike extends Document {
    likedByUser: mongoose.Types.ObjectId;
    likedUserId: mongoose.Types.ObjectId;
    like: number;
    view: number;
    matches: number;
}

const likeSchema: Schema<ILike> = new Schema(
    {
        likedByUser: {
            type: Schema.Types.ObjectId,
            ref: "User",
           
        },
        likedUserId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        like: {
            type: Number,
            enum: [Enum.LIKE.LIKE, Enum.LIKE.UNLIKED],
            default: Enum.LIKE.UNLIKED,
            required: true
        },
        view: {
            type: Number,
            enum: [Enum.VIEW.VIEW, Enum.VIEW.UNVIEW],
            default: Enum.VIEW.UNVIEW,
            required: true
        },
        matches: {
            type: Number,
            enum: [Enum.MATCHES.MATCH, Enum.MATCHES.UNMATCH],
            default: Enum.MATCHES.UNMATCH
        }
    },
    { timestamps: true }
);


const LikeModel: Model<ILike> = mongoose.model<ILike>('Like', likeSchema);
export default LikeModel;
