import { Property } from "../models/Property";
import { Request, Response } from "express";

const createProperty = async (req: Request, res:Response) => {
    try {
        const property = new Property(req.body);
        await property.save();
        res.status(201).json(property);
    } catch (err: any) {
        if (err.code === 11000) {
            // Duplicate key error
            res.status(409).json({ error: 'serial_tag already exists' });
        } else {
            res.status(400).json({ error: err.message });
        }
    }
};

// Get all properties
const getProperties = async (req: Request, res:Response) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (err:  any) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single property by ID
const getPropertyById = async (req: Request, res:Response) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ error: "Property not found" });
        res.status(200).json(property);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

// Update a property by ID
const updateProperty = async (req: Request, res:Response) => {
    try {
        const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!property) return res.status(404).json({ error: "Property not found" });
        res.status(200).json(property);
    } catch (err: any) {
        if (err.code === 11000) {
            // Duplicate key error
            res.status(409).json({ error: 'serial_tag already exists' });
        } else {
            res.status(400).json({ error: err.message });
        }
    }
};

// Delete a property by ID
const deleteProperty = async (req: Request, res:Response) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);
        if (!property) return res.status(404).json({ error: "Property not found" });
        res.status(200).json({ message: "Property deleted successfully" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

const Props = {
    getProperties, 
    getPropertyById,
    updateProperty,
    deleteProperty,
    createProperty
}

export  { Props };