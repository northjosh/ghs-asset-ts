import { Schema, Model, model } from "mongoose";

interface IMedicalEquipment {
    id: number, 
    name: string, 
    purpose: string,
    quantity: number, 
    location: string, 
    manufacturer: string,
    timestamps: any
}

type MedicalEquipmentModel = Model<IMedicalEquipment>

const medicalEquipmentSchema = new Schema<IMedicalEquipment, MedicalEquipmentModel>({
    id : {
		type: Number,
		required: true,
		unique: true
	},

	name: {
		type: String,
		required: true,
		unique: true
	},

	purpose: {
		type: String,
		required: true
	},

	quantity: {
		type: Number,
		required: true
	},

	location: {
		type: String,
		required: true
	},

	manufacturer: {
		type: String,
		required: true
	}
}, {
	timestamps: {
		createdAt: "created_at",
		updatedAt: true
	}
}) 


const MedicalEquipment = model<IMedicalEquipment, MedicalEquipmentModel>("MedicalEquipment", medicalEquipmentSchema)

export { MedicalEquipment };