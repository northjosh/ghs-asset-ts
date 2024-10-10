import exp from "constants";
import { ServerResponse } from "http";
import { Schema, Model, model } from "mongoose";


interface IResearchCenter {
    centre_name: string,
    location: string,
    focus_areas: string,
    researchers: number,
    funding_sources: string
    established_date: Date
}


type ResearchCenterModel = Model<IResearchCenter>

const researchCenterSchema = new Schema<IResearchCenter, ResearchCenterModel>({
    centre_name: {
        type: String,
        required: true,
    },
    location :{
        type: String,
        required: true,
    },
    focus_areas:{
        type: String,
        required: true
    },
    researchers:{
        type: Number,
        required: true,
    },
    funding_sources:{
        type: String,
        required: true
    },
    established_date:{
        type: Date,
        required: true
    }
})

const ResearchCenter = model<IResearchCenter, ResearchCenterModel>("ResearchCenter", researchCenterSchema)

export { ResearchCenter }