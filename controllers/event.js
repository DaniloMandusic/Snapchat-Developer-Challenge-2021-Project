const model = require('../models/event');

module.exports.getEventInfo = async function(req, res, next)
{
    const postEventName = req.body.inputEventName; // inputEventName jer mora da bude isto kao atribut name u html-u 
    const postEventTime = req.body.inputEventTime;
    const postEventDescription = req.body.inputEventDescription;

    // Ovde mozda provera baze podataka da se vidi da li su ovi podaci vec uneti bili u bazu
    // radi zabrane duplikata

    // Add event to the database
    await model.addEvent(postEventName, postEventTime, postEventDescription);

    // Ovde ide res.render stranice EventPage.ejs sa ovim fajlovima, jedino sto pre
    // toga treba da se zapisu ti podaci u bazi podataka

    res.render("EventPage.ejs", {
        eventName: postEventName,
        eventTime: postEventTime,
        eventDescription: postEventDescription
    });

};

