import { Router } from "express"
import { createPharmaceutical, deletePharmaceutical, getPharmaceutical, getPharmaceuticalById, updatePharmaceutical } from "../controllers/Pharmaceuticals.controller"


export const router = Router()

router.get("/", getPharmaceutical)
router.get("/:id", getPharmaceuticalById as any)
router.post("/create", createPharmaceutical as any)
router.put("/update/:id", updatePharmaceutical as any)
router.delete("/delete/:id", deletePharmaceutical as any)


