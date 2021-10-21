const mongoose = require('mongoose');
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
    }
}, {collection: "events"});

const eventModel = mongoose.model("Event", eventSchema);


module.exports.addEvent = async function(postEventName, postEventTime, postEventDescription,postEventImage)
{
    let newEvent = new eventModel();
    newEvent._id = new mongoose.Types.ObjectId();
    newEvent.eventName = postEventName;
    newEvent.eventTime = postEventTime;
    newEvent.eventDescription = postEventDescription;
    newEvent.eventImage = postEventImage;
    // Fali drugo vreme/datum i slika ovde
    await newEvent.save();
}