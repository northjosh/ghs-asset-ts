import { Router } from "express"
import { getMedicalSchool, createMedicalSchool, getMedicalSchoolById, deleteMedicalSchool, updateMedicalSchool } from "../controllers/MedicalSchool.controller"

const router = Router()

router.post("/create", createMedicalSchool as any)
router.get("/", getMedicalSchool)
router.get("/:id", getMedicalSchoolById)
router.put("/update/:id", updateMedicalSchool as any)
router.delete("/delete/:id", deleteMedicalSchool)

export default router;

