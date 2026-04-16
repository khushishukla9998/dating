import mongoose, { Schema, Document, Model } from 'mongoose';
import Enum from '../../utils/enum'; // Assuming enum has MATCHES

export interface IScheduleDte extends Document {
  requestDateBy: mongoose.Types.ObjectId;
  dateMember: mongoose.Types.ObjectId;
  date: string;
  time: string;
  location: {
    type: string;
    coordinates: number[];
  };
  message?: string;
  panicMode: number;
  response: Number;
  RquesterRating: string;
  RquesterExperience: string;
  requesterRatingStatus: number;
  dateMemberRating: string;
  dateMemberExperience: string;
  dateMemberRatingStatus: number;


}

const scheduleSchema: Schema<IScheduleDte> = new Schema(
  {
    requestDateBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    dateMember: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    date: {
      type: String,
    },

    time: {
      type: String,
    },

    location: {
      type: {
        type: String,

        default: 'Point'
      },
      coordinates: {
        type: [Number],

      }
    },
    message: {
      type: String,
    },

    panicMode: {
      type: Number,
      enum: [Enum.PANIC_MODE.ON, Enum.PANIC_MODE.OFF],
      default: Enum.PANIC_MODE.OFF
    },

    response: {
      type: Number,
      enum: [Enum.RESPONSE.ACCEPT, Enum.RESPONSE.REJECT],
      default: Enum.RESPONSE.REJECT
    },

    RquesterRating: {
      type: String
    },

    RquesterExperience: {
      type: String
    },
    requesterRatingStatus: {
      type: Number,
      enum: [Enum.RATING_STATUS.COMPLETED, Enum.RATING_STATUS.NOT_COMPLETED],
      default: Enum.RATING_STATUS.NOT_COMPLETED
    },

    dateMemberRating: {
      type: String
    },

    dateMemberExperience: {
      type: String
    },
    dateMemberRatingStatus: {
      type: Number,
      enum: [Enum.RATING_STATUS.COMPLETED, Enum.RATING_STATUS.NOT_COMPLETED],
      default: Enum.RATING_STATUS.NOT_COMPLETED
    }
  },
  { timestamps: true }
);

const ScheduleModel: Model<IScheduleDte> = mongoose.model<IScheduleDte>('Schedule', scheduleSchema);
export default ScheduleModel;
