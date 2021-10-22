const model = require('../models/event');

function showPage(req,res,next)
{
    res.render('makeEvent.ejs');
}

async function getEventInfo(req, res, next)
{
    try
    {
        const postEventName = req.body.inputEventName;
        const postEventTime = req.body.inputEventTime;
        const postEventDescription = req.body.inputEventDescription;
        const postEventImage = req.file.filename;
        // Ovde mozda provera baze podataka da se vidi da li su ovi podaci vec uneti bili u bazu
        // radi zabrane duplikata

        // Add event to the database
        const eventFromDb = await model.addEvent(postEventName, postEventTime, postEventDescription, postEventImage);
        res.redirect(`/event/${eventFromDb.slug}`);
    }
    catch(err)
    {
        next(err);
    }
}

async function showEvent(req, res, next)
{
    try{
        console.log('hello');
        let event = await model.findEventBySlug(req.params.slug);
        res.render("eventPage.ejs", {
            eventName: event.eventName,
            eventTime: event.eventTime,
            eventDescription: event.eventDescription,
            eventImage : event.eventImage,
        });
    }
    catch(err)
    {
        next(err);
    }   
}

module.exports = {
    showEvent,
    getEventInfo,
    showPage,
};

