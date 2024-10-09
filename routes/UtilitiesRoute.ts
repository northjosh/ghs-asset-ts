import { Router } from "express"
import { getUtilities, getUtilityById, updateUtility, createUtilities, deleteUtility } from "../controllers/Utilities.controller"


const router = Router()

router.get("/", getUtilities)
router.get("/:id", getUtilityById)
router.post("/create", createUtilities as any)
router.put("/update/:id", updateUtility as any)
router.delete("/delete/:id", deleteUtility)

export { router };