import { ResearchCenter } from "../models/ResearchCenter";
import { Request, Response } from "express";

const getResearchCenters = async (req: Request, res:Response) => {
    try{
        const researchCenter = await ResearchCenter.find()
        res.status(200).json(researchCenter)
        
    }catch(error){
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
    }
}

const getResearchCenterById = async (req: Request, res:Response) => {
    try{
        const {id} = req.params
        const researchCenter = ResearchCenter.findOne({id: id}) 
        res.send(200).json(researchCenter)
    }catch(error){
        res.send(500).json({message: "Internal Server Error"})
    }
}

const createResearchCenter = async (req: Request, res:Response) => {
    try {
        const {name} = req.body
        const existingResearchCenter = await ResearchCenter.findOne({center_name: name})

        if (existingResearchCenter) {
            return res.status(200).json({message: "Research Center Center does not exist."})
        }

        const researchData = req.body
        const researchCenter = new ResearchCenter(researchData)
        await researchCenter.save()
        res.status(200).json({message: "Research Center created successfully!"})

    
    }catch(error){
        console.error(error)
        res.send(500).json({message: "Internal Server Error"})

    }
}

const updateResearchCenter  = async (req: Request, res:Response) => {
    const {id} = req.params
    const {center_id, center_name, location, focus_areas, researchers, funding_sources, collaborators} = req.body
    const updateFields: any = {center_id, center_name, location, focus_areas, researchers, funding_sources, collaborators}
    
    Object.keys(updateFields).forEach((key) => updateFields[key] == undefined && delete updateFields[key])

    try {
        const researchCenter = await ResearchCenter.findByIdAndUpdate(id, updateFields, {new: true})
        
        if (!researchCenter) {
            return res.status(404).json({message: "Research Center Centre not found!"})
        }
        res.status(202).json({message: " Research Center Center updated succesfully!"})
    }catch(err) {
        console.error(err)
        res.status(500).json({error: "Internal Server Error"}
        )
    }

}

const deleteResearchCenter = async (req: Request, res:Response) => {
	try {
		const {id} = req.params
		const existingResearchCenter = await ResearchCenter.findById(id)

		if (existingResearchCenter) {
			await ResearchCenter.findByIdAndDelete(id)
			res.status(202).json({message: "Research Center Center deleted successfully"})
		} else {
			res.status(204).json({message: "Unable to delete ResearchCenter Center"})
		}
	} catch (error) {
		console.error(error)
		res.send(500).json({message: "Internal server error"})
	}
}

const ResearchCenterController = {getResearchCenters, getResearchCenterById, createResearchCenter, deleteResearchCenter, updateResearchCenter}

export { ResearchCenterController };