import { Router } from "express"
import { updateMedicalEquipment, createMedicalEquipment, deleteMedicalEquipment, getMedicalEquipment, getMedicalEquipmentById } from "../controllers/MedicalEquipment.controller"

const router = Router()


router.get("/:id", getMedicalEquipmentById as any)
router.get("/", getMedicalEquipment as any)
router.post("/create", createMedicalEquipment  as any)
router.put("/update/:id", updateMedicalEquipment as any)
router.delete("/delete/:id", deleteMedicalEquipment)

export default router;


