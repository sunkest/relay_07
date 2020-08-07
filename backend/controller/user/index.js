const express = require('express');
const controller = require('./userController.js')

const router = express.Router();

router.get('/getTest', controller.getTest)
module.exports = router;