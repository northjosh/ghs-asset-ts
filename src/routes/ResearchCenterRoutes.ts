import { Router } from "express"
import {ResearchCenterController}  from '../controllers/ResearchCenter.controller'


const router = Router()

router.post("/create", ResearchCenterController.createResearchCenter as any)
router.get("/", ResearchCenterController.getResearchCenters)
router.get("/:id", ResearchCenterController.getResearchCenterById)
router.put("/update/:id", ResearchCenterController.updateResearchCenter as any)
router.delete("/delete/:id", ResearchCenterController.deleteResearchCenter)


module.exports = router

export default router;
