const express = require('express');

const kontroler = require('../controllers/event');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination : function(req, file, cb)
    {
        cb(null, '../Images');
    },
    filename : function(req, file, cb)
    {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage : storage });

router.post("/", upload('image') ,kontroler.prikaziDostupneArtikle);

module.exports = router;