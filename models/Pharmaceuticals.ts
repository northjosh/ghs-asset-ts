import { Schema, Model, model } from "mongoose";

interface IPharmaceuticals {
    id: any, 
    name: string,
    quantity: number,
    date_procured: Date,
    expiry_date: Date 

}

type PharmaceuticalModel  = Model<IPharmaceuticals>

const pharmaceuticalSchema = new Schema<IPharmaceuticals, PharmaceuticalModel>({
    id: {
		type: Number,
		required: true,
		unique: true
	},

	name: {
		type: String,
		required: true,
		unique: true
	},

	quantity: {
		type: Number,
		required: true,
	},

	date_procured: {
		type: Date,
		required: true
	},

	expiry_date: {
		type: Date,
		required: true
	}
})


const Pharmaceutical = model<IPharmaceuticals, PharmaceuticalModel>("Pharmaceutical", pharmaceuticalSchema)

export { Pharmaceutical }