const model = require('../models/event');

function showPage(req,res,next)
{
    res.render('makeEvent.ejs');
}

async function getEventInfo(req, res, next)
{
    try{
    const postEventName = req.body.inputEventName;
    let postEventStartTime = req.body.inputEventStartTime;
    let postEventEndTime = req.body.inputEventEndTime; // 2021-10-11T03:01
    let postEventTime = "";
    
    // Date validation shenaningas
    let startDatetime = new Date(postEventStartTime);
    let endDatetime = new Date(postEventEndTime);
    startDatetime.setSeconds(0, 0); // Seconds and milliseconds are irrelevant for comparison
    endDatetime.setSeconds(0, 0);
    const startDate = startDatetime.toLocaleDateString('de-DE');
    const startTime = startDatetime.toLocaleTimeString(['de-DE'], {hour: '2-digit', minute:'2-digit'});
    const endDate = endDatetime.toLocaleDateString('de-DE');
    const endTime = endDatetime.toLocaleTimeString(['de-DE'], {hour: '2-digit', minute:'2-digit'}); 
    
    if(Date.parse(startDatetime.toLocaleDateString()) > Date.parse((endDatetime.toLocaleDateString()))) // Comparison in US format
    {
        postEventTime = "Error: start date > end date.";
    }
    else if(startTime > endTime)
    {
        postEventTime = "Error: start time > end time."
    }
    else if(Date.parse(startDatetime.toLocaleDateString()) == Date.parse((endDatetime.toLocaleDateString())))
    {
        postEventTime = `Event duration: ${startTime}h   -   ${endTime}h, ${startDate}`;
    }
    else postEventTime = `Event duration: ${startDate}, ${startTime}h   -    ${endTime}h, ${endDate}`;

    const postEventDescription = req.body.inputEventDescription;
    const postEventImage = req.file.filename;

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