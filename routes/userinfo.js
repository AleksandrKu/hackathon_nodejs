'use strict';
const express = require('express');
const router = express.Router();
const parseController = require('../controllers/index');

router.get('/', parseController.userinfo );
router.post('/add', parseController.userinfoadd);
router.post('/addaddress', parseController.userinfoaddaddress);
router.get('/get/*/*', parseController.userinfoget);
router.use('*', (req, res) => {
    res.status(404).send('Page not found');
});
module.exports = router;