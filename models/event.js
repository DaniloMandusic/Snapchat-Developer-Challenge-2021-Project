const mongoose = require('mongoose');
/*
Event{
    Name: string
    Time: string
    Description: string
    Image: .img
}
*/
const eventSchema = mongoose.Schema({
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
        required: true,
    }
}, {collection: "events"});

const eventModel = mongoose.model("Event", eventSchema);


module.exports.addEvent = async function(postEventName, postEventTime, postEventDescription)
{
    let newEvent = new eventModel();
    newEvent._id = new mongoose.Types.ObjectId();
    newEvent.eventName = postEventName;
    newEvent.eventTime = postEventTime;
    newEvent.eventDescription = postEventDescription;
    // Fali drugo vreme/datum i slika ovde
    await newEvent.save();
}