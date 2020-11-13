const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');


router.get('/show', ctrl.lists.show);
router.get('/:userId', ctrl.lists.getLists);
router.post('/create', ctrl.lists.createList);

module.exports = router;