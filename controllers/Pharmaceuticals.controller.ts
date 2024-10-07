import { isRegExp } from "util";
import { Pharmaceutical } from "../models/Pharmaceuticals";
import { Request, Response } from "express";

const getPharmaceutical = async (req: Request, res:Response) => {
	try {
		const pharmaceuticals = await Pharmaceutical.find();
		res.status(200).json(pharmaceuticals);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const createPharmaceutical = async (req: Request, res:Response ) => {
	try {
		const { name } = req.body;
		const existingPharmaceutical = await Pharmaceutical.findOne({ name: name });

		if (existingPharmaceutical) {
			return res.status(409).json({ message: "Pharmaceutical already exists" });
		}

		const pharmaceuticalData = req.body;
		const newPharmaceutical = new Pharmaceutical(pharmaceuticalData);
		await newPharmaceutical.save();
		res.status(201).json({ message: "Pharmaceutical created successfully" });
		//res.status(201).json(newPharmaceutical);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const updatePharmaceutical = async (req: Request, res:Response) => {
	const { id } = req.params;
	const { name, provider, usage, last_checked, next_check, status } = req.body;
	const updateFields : any = { name, provider, usage, last_checked, next_check, status };

	// Remove undefined fields from the update object
	Object.keys(updateFields).forEach((key) => updateFields[key] === undefined && delete updateFields[key]);

	try {
		const updatedPharmaceutical = await Pharmaceutical.findByIdAndUpdate(id, updateFields, { new: true });
		if (!updatedPharmaceutical) {
			return res.status(404).json({ message: 'Pharmaceutical not found' });
		}
		res.status(200).json({ message: 'Pharmaceutical updated successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const deletePharmaceutical = async (req: Request, res:Response) => {
	try {
		const { id } = req.params;
		const existingPharmaceutical = await Pharmaceutical.findById(id);

		if (!existingPharmaceutical) {
			return res.status(404).json({ message: "Pharmaceutical not found" });
		}

		await Pharmaceutical.findByIdAndDelete(id);
		res.status(200).json({ message: "Pharmaceutical deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const getPharmaceuticalById = async (req: Request, res:Response) => {
	try {
		const { id } = req.params;
		const pharmaceutical = await Pharmaceutical.findById(id);
		if (!pharmaceutical) {
			return res.status(404).json({ message: "Pharmaceutical not found" });
		}
		res.status(200).json(pharmaceutical);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};


export {getPharmaceutical, getPharmaceuticalById, createPharmaceutical, updatePharmaceutical, deletePharmaceutical}