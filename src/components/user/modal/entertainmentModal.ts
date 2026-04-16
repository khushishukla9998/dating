
import mongoose, { Schema, Document, Model } from 'mongoose';
import appString from '../../utils/appString';
import Enum from '../../utils/enum';


export interface IEntertainment extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    videoUrl: string;
    thumbnailUrl: string;
    description: string;
    images: string[];
}

const entertainmentSchema: Schema<IEntertainment> = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        title: { type: String, required: true },
        description: { type: String },
        videoUrl: { type: String, required: true },
        thumbnailUrl: { type: String },
        images: [{ type: String }]
    },
    { timestamps: true }
);

const Entertainment: Model<IEntertainment> = mongoose.model<IEntertainment>('Entertainment', entertainmentSchema);
export default Entertainment;
