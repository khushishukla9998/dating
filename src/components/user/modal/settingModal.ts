import mongoose, { Schema, Document, Model } from 'mongoose';
import appString from '../../utils/appString';


export interface IStepItem {
    key: string;
    isRequired: number;
}

export interface ISteps extends Document {
    step1: IStepItem;
    step2: IStepItem;
    step3: IStepItem;
    step4: IStepItem;
    step5: IStepItem;
    step6: IStepItem;
    step7: IStepItem;
    step8: IStepItem;
    step9: IStepItem;
    step10: IStepItem;
}

const stepSchema: Schema<ISteps> = new Schema({
    step1: { key: String, isRequired: Number },
    step2: { key: String, isRequired: Number },
    step3: { key: String, isRequired: Number },
    step4: { key: String, isRequired: Number },
    step5: { key: String, isRequired: Number },
    step6: { key: String, isRequired: Number },
    step7: { key: String, isRequired: Number },
    step8: { key: String, isRequired: Number },
    step9: { key: String, isRequired: Number },
    step10: { key: String, isRequired: Number },
}, { _id: false });


export interface ISetting extends Document {
    stepLevel: ISteps[];
}


const settingSchema: Schema<ISetting> = new Schema(
    {
        stepLevel: {
            type: [stepSchema],

        },
    }, { timestamps: true }
);

const Setting: Model<ISetting> = mongoose.model<ISetting>(appString.SETTING, settingSchema);

export default Setting;
