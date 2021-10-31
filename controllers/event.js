const model = require('../models/event');

function mainPage(req,res,next)
{
    res.render('mainPage.ejs');
}

function makeEvent(req,res,next)
{
    res.render("makeEvent.ejs");
}

function showLogin(req, res, next)
{   
    res.render("login.ejs");
}


async function getEventInfo(req, res, next)
{
    try{
    const postEventName = req.body.inputEventName;
    const postEventTime = req.body.eventTime;
    
    const postEventDescription = req.body.inputEventDescription;
    const postEventImage = req.file.filename;

        // Add event to the database
        const eventFromDb = await model.addEvent(postEventName, postEventTime, postEventDescription, postEventImage);
        res.redirect(`/events/${eventFromDb.slug}`);
    }
    catch(err)
    {
        next(err);
    }
}

async function showEvent(req, res, next)
{
    try{
        
        let event = await model.findEventBySlug(req.params.slug);
        res.render("eventPage.ejs", {
            eventName: event.eventName,
            eventTime: event.eventTime,
            eventDescription: event.eventDescription,
            eventImage : event.eventImage,
            eventParticipants : event.participants
        });
    }
    catch(err)
    {
        next(err);
    }   
}


async function searchForEvent(req, res, next)
{
    try
    {
        const eventSlug = req.body.search; // nikolas party
        const event = await model.findEventBySlug(eventSlug); 
        if(event != null)
        {
            res.redirect(`/events/${event.slug}`)
        }
        else
        {
            res.render("makeEvent.ejs");
        }
        
    }
    catch(err)
    {
        next(err);
    }
}

async function redirectLogin(req, res, next)
{
    
    const userData = req.body.userData;
    console.log("User data: ", userData);
    const eventName = req.body.eventName;
    const event = await model.addParticipant(eventName, userData);
    console.log(event);
    if(event != null)
    {
        res.redirect(`/events/${event.slug}`); // ne radi
    }
    else return new Error("Error: slug not found :: redirectLogin\n");
}

 // Treba povezati nalog sa eventom

module.exports = {
    showEvent,
    getEventInfo,
    mainPage,
    searchForEvent,
    makeEvent,
    showLogin,
    redirectLogin
};