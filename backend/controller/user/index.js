import express from 'express'
import controller from './userController.js'

const router = express.Router();

router.get('/getTest', controller.getTest)
module.exports = router;