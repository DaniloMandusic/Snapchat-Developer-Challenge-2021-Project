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

router.get('/', controller.mainPage);
router.post('/event', controller.makeEvent);
router.post('/add', upload.single('image') , controller.getEventInfo);
router.post('/search', controller.searchForEvent);
router.get('/events/:slug', controller.showEvent);

module.exports = router; 
