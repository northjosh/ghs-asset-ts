import { Schema, Model, model } from "mongoose";

interface IWorkforce {
    employee_id : string,
    name: string,
    role: string,
    department: string,
    performance_rating: string,
}

type WorkforceModel = Model<IWorkforce>

const workforceSchema = new Schema<IWorkforce, WorkforceModel>({
    employee_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    performance_rating: {
        type: String,
        enum: ["Excellent", "Good", "Bad"],
        required: true
    }
})

const Workforce = model<IWorkforce, WorkforceModel>("Workforce", workforceSchema)

export { Workforce }