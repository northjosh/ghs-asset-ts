import { Request, Response } from "express";
import { MedicalEquipment } from "../models/MedicalEquipment";


const getMedicalEquipment = async (req: Request, res:Response) => {
	try {
		const medicalEquipments = await MedicalEquipment.find()
		return res.status(200).json(medicalEquipments)
	} catch (error) {
		console.error(error)
		res.status(500).json({message: "Internal server error"})
	}
}


const getMedicalEquipmentById = async (req: Request, res:Response) => {
	try {
		const {id} = req.params
		const medicalEquipments = await MedicalEquipment.findById(id)
		return res.status(200).json(medicalEquipments)
	} catch (error) {
		console.error(error)
		res.status(500).json({message: "Internal server error"})
	}
}


const createMedicalEquipment = async (req: Request, res:Response) => {
	try {
		const {name} = req.body
		const existingMedicalEquipment = await MedicalEquipment.findOne({name: name})

		if (existingMedicalEquipment) {
			return res.status(200).json({message: "This equipment already exists"})
		}

		const medicalEquipmentData = req.body
		const medicalEquipment = new MedicalEquipment(medicalEquipmentData)
		await medicalEquipment.save()

		return res.status(200).json({message: "Equipment added successfully"})
	} catch (error) {
		console.error(error)
		res.status(500).json({message: "Internal server error"})
	}
}


const updateMedicalEquipment = async (req: Request, res:Response) => {
	try {
		const {id} = req.params
		if (!req.body) {
			return res.status(200).json({message: "Bad request"})
		}

		await MedicalEquipment.findByIdAndUpdate(id, req.body)
		res.status(200).json({message: "Equipment updated successfully"})
	} catch (error) {
		console.error(error)
		return res.status(500).json({message: "Internal Server Error"})
	}
}


const deleteMedicalEquipment = async (req: Request, res:Response) => {
	try {
		const {id} = req.params

		await MedicalEquipment.findByIdAndDelete(id)
		res.status(200).json({message: "Equipment deleted successfully"})
	} catch (error) {
		console.error(error)
		res.status(500).json({message: "Internal Server Error"})
	}

}


export { getMedicalEquipment, getMedicalEquipmentById, createMedicalEquipment, deleteMedicalEquipment, updateMedicalEquipment}
