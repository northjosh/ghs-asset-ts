const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/PropertyController');

router.post('/create', propertyController.createProperty);
router.get('/', propertyController.getProperties);
router.get('/:id', propertyController.getPropertyById);
router.put('/update/:id', propertyController.updateProperty);
router.delete('/delete/:id', propertyController.deleteProperty);
module.exports = router;
