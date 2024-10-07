import { Request, Response } from "express";
import { MedicalSchool } from "../models/MedicalSchool";



const getMedicalSchool = async (req: Request, res: Response) => {
    try{
        const medical = await MedicalSchool.find()

        res.status(200).json(medical)
    }catch(e){
        console.error(e)
        res.status(500).json({message: "Internal Server Error"})
    }
}

const getMedicalSchoolById = async (req: Request<{id: string}, {}, {}>, res: Response) => {
    try{
        const {id} = req.params
        console.log(id)
        // const medical = await MedicalSchool.findOne({school_id: id}) 
        const medical = await MedicalSchool.findById(id) 
        res.status(200).json(medical)
    }catch(error){
        res.status(500).json({"message": "Internal Server Error"})
    }
}

const createMedicalSchool = async (req: Request, res: Response) => {
    try {
        const {name} = req.body
        const existingMedical = await MedicalSchool.findOne({school_name: name})

        if (existingMedical) {
            return res.status(200).json({"message": "Medical Center does not exist."})
        }

        const medicalData = req.body
        const medical = new MedicalSchool(medicalData)
        await medical.save()

        res.status(200).json({message:"Medical School created successfully"})

    
    }catch(error){
        console.error(error)
        res.status(500).json({"message": "Internal Server Error"})

    }
}

const updateMedicalSchool  = async (req: Request<{id: string}, {}>, res: Response) => {
    const {id} = req.params
    const {school_name, location, year_established, tuition, affliated_hospitals, faculty_members} = req.body
    const updateFields: any = {school_name , location, year_established, tuition, affliated_hospitals, faculty_members}
    
    
    Object.keys(updateFields).forEach((key) => updateFields[key] == undefined && delete updateFields[key])

    try {
        const medical = await MedicalSchool.findByIdAndUpdate(id, updateFields, {new: true})
        
        if (!medical) {
            return res.status(404).json({message: "Medical SChool not found!"})

        }
        res.status(202).json({message: " Medical SChool updated succesfully!"})
    }catch(err) {
        console.error(err)
        res.status(500).json({error: "Internal Server Error"}
        )
    }

}

const deleteMedicalSchool = async (req: Request, res: Response) => {
	try {
		const {id} = req.params

		// const existingMedical = await MedicalSchool.findOne({school_id: id})d
		const existingMedical = await MedicalSchool.findById(id)

		if (existingMedical) {
			await MedicalSchool.findOneAndDelete({school_id: existingMedical._id})
			res.status(202).json({message: "Medical Center deleted successfully"})
		} else {
			res.status(204).json({message: "Unable to delete Medical Center. Not Found!"})
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({message: "Internal server error"})
	}
}


export {getMedicalSchool, getMedicalSchoolById, createMedicalSchool, deleteMedicalSchool, updateMedicalSchool}

