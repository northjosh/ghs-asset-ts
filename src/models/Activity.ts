import {Schema, Model, model} from "mongoose";

interface IActivity{
    userId: any, 
    timestamp: Date, 
    action: string, 
    details: string
}


type ActivityModel = Model<IActivity>
const ActivitySchema = new Schema<IActivity, ActivityModel>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      action: {
        type: String,
        required: true,
      },
      details: {
        type: Schema.Types.Mixed,
      },
})

const Activity: ActivityModel = model<IActivity, ActivityModel>("ActivityLog", ActivitySchema)


export { Activity };


