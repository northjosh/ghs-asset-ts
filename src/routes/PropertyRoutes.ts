import { Router } from "express"
import { Props } from "../controllers/Property.controller";


const router = Router();


router.post('/create', Props.createProperty);
router.get('/', Props.getProperties);
router.get('/:id', Props.getPropertyById as any);
router.put('/update/:id', Props.updateProperty as any);
router.delete('/delete/:id', Props.deleteProperty as any);
module.exports = router;


export default router;
