const express= require('express');
const router= express.Router();
const controller= require('../Controllers/User')

//router.get('/', controller.get);
 router.get('/', controller.getNewUser);

router.get('/:id', controller.userOrders);

router.get('/:email/:password', controller.getOneUser);

router.post('/',controller.addUser );

router.put('/:id', controller.updateUser);

router.delete('/:email',controller.remove )


module.exports= router;