const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.browse.index);
router.get('/:child_id/:food_id',ctrl.browse.getLastExposure);
router.post('/addfood', ctrl.browse.addFood);

module.exports = router;