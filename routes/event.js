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
router.get('/events/:slug', controller.showEvent);
router.get('/login', controller.showLogin);

router.post('/event', controller.makeEvent);
router.post('/add', upload.single('image') , controller.getEventInfo);
router.post('/search', controller.searchForEvent);
<<<<<<< HEAD
router.get('/events/:slug', controller.showEvent);

router.get('/login', controller.showLogin);
=======
router.post("/test", controller.redirectLogin);

>>>>>>> da4d2963df73972145b2a3e3bf236259ff32bccf

module.exports = router; 
