import exp from "constants";
import { Schema, Model, model } from "mongoose";

interface IUtilities {
    name: string,
    provider: string, 
    usage : string,
    last_checked: Date,
    next_check: Date
}

type UtilitiesModel = Model<IUtilities>

const utilitiesSchema = new Schema<IUtilities, UtilitiesModel>({
    name: {
		type: String,
		required: true,
		unique: true
	},

	provider: {
		type: String,
		required: true
	},

	usage: {
		type: String,
		required: true
	},

	last_checked: {
		type: Date,
		required: true
	},

	next_check: {
		type: Date,
		required: true
	},

})

const Utilities = model<IUtilities, UtilitiesModel>("Utilities", utilitiesSchema)

export { Utilities }