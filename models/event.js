const mongoose = require('mongoose');
const slugify = require('slugify');

const eventSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    eventName: {
        type: String,
        required: true
    },
    eventTime: {
        type: String,
        required: true
    },
    eventDescription: {
        type: String,
        required: true
    },
    eventImage: {
        type: String,
        required: true
    },
    slug : {
        type : String,
        required: true,
        unique : true
    }
}, {collection: "events"});

//Creating a slug for every event that's saved
eventSchema.pre('validate', function(next) {
    if(this.eventName)
    {
        this.slug = slugify(this.eventName, {
            lower : true,
            strict : true
        });
    }

    next();
});

const eventModel = mongoose.model("Event", eventSchema);

 async function addEvent(postEventName, postEventTime, postEventDescription,postEventImage)
{
    let newEvent = new eventModel();
    newEvent._id = new mongoose.Types.ObjectId();
    newEvent.eventName = postEventName;
    newEvent.eventTime = postEventTime;
    newEvent.eventDescription = postEventDescription;
    newEvent.eventImage = postEventImage;
    // Fali drugo vreme/datum i slika ovde
    let eventFromDB = await newEvent.save();
    return eventFromDB;
}

async function findEventBySlug(eventSlug)
{
    let event =  await eventModel.findOne({slug : eventSlug}).exec();
    return event;
}

module.exports = {
    addEvent,
    findEventBySlug,
}