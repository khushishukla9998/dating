import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISubField {
    [key: string]: any;
}

export interface IStepItem extends Document {
    key: string; 
    isRequired: boolean;
    fields: ISubField; 
}

export interface ISteps extends Document {
    some(arg0: (s: any) => boolean): unknown;
    ISteps: any;
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
} { _id: false };


const stepSchema: Schema<ISteps> = new Schema({
    step1: { key: String, isRequired: Number, fields: Object },
    step2: { key: String, isRequired: Number, fields: Object },
    step3: { key: String, isRequired: Number, fields: Object },
    step4: { key: String, isRequired: Number, fields: Object },
    step5: { key: String, isRequired: Number, fields: Object },
    step6: { key: String, isRequired: Number, fields: Object },
    step7: { key: String, isRequired: Number, fields: Object },
    step8: { key: String, isRequired: Number, fields: Object },
    step9: { key: String, isRequired: Number, fields: Object },
    step10: { key: String, isRequired: Number, fields: Object },
}, { _id: false })

export interface ISetting extends Document {
    stepLevel: ISteps;
}

const settingSchema: Schema<ISetting> = new Schema(
    {
        stepLevel: [{ type: stepSchema, required: true }],
    },
    { timestamps: true }
);
const Setting = mongoose.model<ISetting>('Setting', settingSchema);
export default Setting;

