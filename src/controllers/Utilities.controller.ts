import { Request, Response } from "express";
import { Utilities } from "../models/Utilities";

const getUtilities = async (req: Request, res: Response) => {
	try {
		const utilities = await Utilities.find()
		res.status(200).json(utilities)
	} catch (error) {
		console.error(error)
		res.status(500).json({message: "Internal server error"})
	}
}

const createUtilities = async (req: Request, res: Response) => {
	console.log(req.body)
    try {
        const { name } = req.body;
        const existingUtility = await Utilities.findOne({ name: name });

        if (existingUtility) {
            return res.status(200).json({ message: "Utility already exists" });
        }

        const utilityData = req.body;
        const utility = new Utilities(utilityData);
        await utility.save();

        return res.status(201).json({ message: "Utility created successfully", utility });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



const updateUtility = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, provider, usage, last_checked, next_check, status } = req.body
  const updateFields: any = { name, provider, usage, last_checked, next_check, status }

  // Remove undefined fields from the update object
  Object.keys(updateFields).forEach((key) => updateFields[key] === undefined && delete updateFields[key])

  try {
    const utility = await Utilities.findByIdAndUpdate(id, updateFields, { new: true })
    if (!utility) {
      return res.status(404).json({ msg: 'Utility not found' })
    }
    res.status(202).json({ message: 'Utility updated successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}


const deleteUtility = async (req: Request, res: Response) => {
	try {
		const {id} = req.params
		const existingUtility = await Utilities.findById(id)

		if (existingUtility) {
			await Utilities.findOneAndDelete({name: existingUtility.name})
			res.status(202).json({message: "Utility deleted successfully"})
		} else {
			res.status(204).json({message: "Unable to delete Utility"})
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({message: "Internal server error"})
	}
}


const getUtilityById = async (req: Request, res: Response) => {
	try {
		const {id} = req.params

		const utility = await Utilities.findById(id);
		res.json(utility)
	} catch (error) {
		console.error(error)
		res.status(500).json({message: "Internal server error"})
	}
}

export {
	getUtilities,
	createUtilities,
	updateUtility,
	deleteUtility,
	getUtilityById
}