const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/:user_id', ctrl.lists.getLists);
router.post('/create', ctrl.lists.createList);
router.post('/add', ctrl.lists.addFoodToList);
router.post('/delete', ctrl.lists.deleteList);
router.post('/remove', ctrl.lists.removeFood);
router.post('/sendtext', ctrl.lists.sendListText)

module.exports = router;