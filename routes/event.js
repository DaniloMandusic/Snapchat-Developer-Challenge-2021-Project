const express = require('express');

const controller = require('../controllers/event');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination : function(req, file, cb)
    {
        cb(null, './images');
    },
    filename : function(req, file, cb)
    {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage : storage });

router.get('/',controller.showPage);
router.post('/add',upload.single('image') , controller.getEventInfo);

module.exports = router;