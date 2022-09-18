const express= require('express');
const router= express.Router();
const controller= require('../Controllers/Orders')

router.get('/', controller.get);

router.get('/:id', controller.getOnOrder);

router.post('/',controller.addOrder );

router.put('/:id', controller.updateOrder);

router.delete('/:id', controller.remove);

module.exports= router;