const model = require('../models/event');

async function getEventInfo(req, res, next) {
    try {
        let name = req.body.inputEventName.trim();
        let time = req.body.inputEventTime.trim();      
        let description = req.body.inputEventDescription.trim();
        let image = req.file.filename;
        await model.addEvent(name, time, description, image);
    }
    catch(err)
    {
        next(err);
    }
}