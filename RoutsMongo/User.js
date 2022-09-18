const express= require('express');
const router= express.Router();
const controller= require('../Controllers/UserMongoose')

router.get('/', controller.getAll);

router.get('/:id', controller.getById)

router.put('/:id', controller.put)

router.post('/', controller.post)

router.delete('/:id',controller.remove )