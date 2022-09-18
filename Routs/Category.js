const express= require('express');
const router= express.Router();
const controller= require('../Controllers/Category')

router.get('/', controller.get);

router.get('/:id', controller.getOneCategory);

router.post('/', controller.addCategory);

router.put('/:id', controller.updateCategory);

router.delete('/:name', controller.remove);

module.exports= router;