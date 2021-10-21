const model = require('../models/event');

function showPage(req,res,next)
{
    res.render('makeEvent.ejs');
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

    // Ovde ide res.render stranice EventPage.ejs sa ovim fajlovima, jedino sto pre
    // toga treba da se zapisu ti podaci u bazi podataka

    res.render("eventPage.ejs", {
        eventName: postEventName,
        eventTime: postEventTime,
        eventDescription: postEventDescription,
        eventImage : postEventImage
    });
    console.log(postEventName);

}

module.exports = {
    getEventInfo,
    showPage,
};

