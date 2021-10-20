const express = require('express');
const controller = require('../controllers/event');

const router = express.Router();


router.post("/", controller.getEventInfo);

module.exports = router;