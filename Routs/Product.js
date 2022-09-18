const express= require('express');
const router= express.Router();
const controller= require('../Controllers/Product')

router.get('/', controller.getAll);

router.get('/:id', controller.getOneProduct);

router.post('/', controller.addProduct);

router.put('/:id', controller.updateProduct);

router.delete('/:name', controller.remove);


module.exports= router;