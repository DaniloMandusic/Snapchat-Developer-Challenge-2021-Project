const model = require('../models/event');

function showPage(req,res,next)
{
    res.render('makeEvent.ejs');
}

function papir(ekser)
{
    dlsajdlkasjdlkjas;
}

async function getEventInfo(req, res, next)
{
    const postEventName = req.body.inputEventName; // inputEventName jer mora da bude isto kao atribut name u html-u 
    const postEventTime = req.body.inputEventTime;
    const postEventDescription = req.body.inputEventDescription;
    const postEventImage = req.file.filename;
    // Ovde mozda provera baze podataka da se vidi da li su ovi podaci vec uneti bili u bazu
    // radi zabrane duplikata

    // Add event to the database
    await model.addEvent(postEventName, postEventTime, postEventDescription, postEventImage);

    res.render("eventPage.ejs", {
        eventName: postEventName,
        eventTime: postEventTime,
        eventDescription: postEventDescription,
        eventImage : postEventImage
    });
}

module.exports = {
    getEventInfo,
    showPage,
};

