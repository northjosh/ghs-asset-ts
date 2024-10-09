const researchController = require("../controllers/ResearchCenterController")
const express = require("express")

const router = express.Router()

router.post("/create", researchController.createResearchCenter)
router.get("/", researchController.getResearchCenters)
router.get("/:id", researchController.getResearchCenterById)
router.put("/update/:id", researchController.updateResearchCenter)
router.delete("/delete/:id", researchController.deleteResearchCenter)


module.exports = router