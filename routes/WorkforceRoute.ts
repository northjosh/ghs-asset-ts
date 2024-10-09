import { Router } from "express";
import WorkforceController from "../controllers/Workforce.controller";

const router = Router();


router.post('/create', WorkforceController.createWorkforce);
router.get('/', WorkforceController.getWorkforce);
router.get('/:id', WorkforceController.getWorkforceById as any);
router.put('/update/:id', WorkforceController.updateWorkforce as any);
router.delete('/delete/:id', WorkforceController.deleteWorkforce as any);



module.exports = router;


