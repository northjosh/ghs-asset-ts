import { Schema, Model, model } from "mongoose";


interface IMedicalSchool {
    school_name: string, 
    location: string, 
    year_established: Date, 
    faculty_members: number
    affiliated_hospitals: string
}

type MedicalSchoolModel = Model<IMedicalSchool>

const MedicalSchoolSchema = new Schema<IMedicalSchool, MedicalSchoolModel>({
    school_name: {
		type: String,
		required: true,
		unique: true
	},
	location: {
		type: String,
		required: true,
	},
	year_established: {
		type: Date,
		required: true,
	},
	faculty_members: {
		type: Number,
		required: true
	},
	affiliated_hospitals: {
		type: String,
		required: true
	},

})

const MedicalSchool = model<IMedicalSchool, MedicalSchoolModel>("MedicalSchool", MedicalSchoolSchema)

export { MedicalSchool }