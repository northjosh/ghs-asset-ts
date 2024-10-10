import { Schema, Model, model } from "mongoose";

interface IProperty {
    name: string,
    id: number,
    type: string, 
    quantity: number, 
    date_procured: Date,
    serial_tag: string,
}
    


type PropertyModel = Model<IProperty>

const propertySchema = new Schema<IProperty, PropertyModel>({
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    date_procured: {
        type: Date,
        required: true
    },
    serial_tag: {
        type: String,
        required: true,
        unique: true
    }
})

const Property = model<IProperty, PropertyModel>("Property", propertySchema)

export { Property }