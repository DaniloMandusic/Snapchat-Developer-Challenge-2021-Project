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
        });
    }
    catch(err)
    {
        next(err);
    }   
}

let globalEventName = "testGlobalna"; // Moze na mnogo bolji nacin - ako vise od jednog korisnika koristi sajt ovo ce izazvati sranje
async function searchForEvent(req, res, next)
{
    try
    {
        globalEventName = req.body.search;
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

// Treba u ovoj funkciji nekako doci do jedne od sledece dve stvari:
    // 1. Linka koji se dobije nakon sto se searchuje event (primer: localhost:3000/events/danilosparty, sto je zapravo localhost:3000/events/:slug)
    // 2. Samog imena eventa (npr. danilosparty)

function redirectLogin(req, res, next)
{
    console.log("Sad smo u redirectLogin i globalna ima vrednost: " + globalEventName);
    const userData = req.body.userData;
    console.log("User data: ", userData);
    res.render("mainPage.ejs");
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