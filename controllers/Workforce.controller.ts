import { Request, Response } from "express";
import { Workforce } from "../models/Workforce";


const createWorkforce = async (req: Request, res: Response) => {
    try {
        const workforce = new Workforce(req.body);
        await workforce.save();
        res.status(201).json(workforce);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};


const getWorkforce = async (req: Request, res: Response) => {
    try {
        const workforce = await Workforce.find();
        res.status(200).json(workforce);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};


const getWorkforceById = async (req:Request, res: Response) => {
    try {
        const workforce = await Workforce.findById(req.params.id);
        if (!workforce) return res.status(404).json({ error: "Workforce entry not found" });
        res.status(200).json(workforce);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};


const updateWorkforce = async (req: Request, res: Response) => {
    try {
        const workforce = await Workforce.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!workforce) return res.status(404).json({ error: "Workforce entry not found" });
        res.status(200).json(workforce);
    } catch (err:any) {
        res.status(400).json({ error: err.message });
    }
};


const deleteWorkforce = async (req: Request, res: Response) => {
    try {
        const workforce = await Workforce.findByIdAndDelete(req.params.id);
        if (!workforce) return res.status(404).json({ error: "Workforce entry not found" });
        res.status(200).json({ message: "Workforce entry deleted successfully" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export = {
    createWorkforce,
    getWorkforce,
    getWorkforceById,
    updateWorkforce,
    deleteWorkforce
}