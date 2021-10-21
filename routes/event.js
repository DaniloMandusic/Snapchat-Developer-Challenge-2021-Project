const express = require('express');

const controller = require('../controllers/event');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination : function(req, file, cb)
    {
        cb(null, './public/images');
    },
    filename : function(req, file, cb)
    {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage : storage });

router.get('/', controller.showPage);
router.post('/add', upload.single('image'), controller.getEventInfo);

module.exports = router;

// Ako se ne uradi upload trebalo bi izbaciti neku gresku i na sajt a ne samo default ono