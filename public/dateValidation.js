let customEventTime = "";

function validateDatetime()
{
    const inputEventStartTime = document.getElementById("inputEventStartTime").value;
    const inputEventEndTime = document.getElementById("inputEventEndTime").value;

    // Date validation //
    let startDatetime = new Date(inputEventStartTime);
    let endDatetime = new Date(inputEventEndTime);
    startDatetime.setSeconds(0, 0); // Seconds and milliseconds are irrelevant for comparison
    endDatetime.setSeconds(0, 0);
    const startDate = startDatetime.toLocaleDateString('de-DE'); 
    const startTime = startDatetime.toLocaleTimeString(['de-DE'], {hour: '2-digit', minute:'2-digit'});
    const endDate = endDatetime.toLocaleDateString('de-DE');
    const endTime = endDatetime.toLocaleTimeString(['de-DE'], {hour: '2-digit', minute:'2-digit'}); 


    if(Date.parse(startDatetime.toLocaleDateString()) > Date.parse((endDatetime.toLocaleDateString()))) // Comparison in US format
    {
        errorMsg = "Error: start date > end date.";
        return false;
    }
    else if(Date.parse(startDatetime.toLocaleDateString()) == Date.parse((endDatetime.toLocaleDateString())))
    {
        if(startDatetime.getTime() >= endDatetime.getTime())
        {
            errorMsg = "Error: start time >= end time";
            return false;
        }
        else 
        {
            customEventTime = `Event duration: ${startTime}h   -   ${endTime}h, ${startDate}`;
            return true;
        }
    }
    else 
    {
        customEventTime = `Event duration: ${startDate}, ${startTime}h   -    ${endTime}h, ${endDate}`;
        return true;
    }
}

const form = document.getElementById("makeEventForm");
form.addEventListener("submit", function(ev){
    if(validateDatetime() == false)
    {
        ev.preventDefault();
        alert(`${errorMsg}`); 
        return false;
    }
    else
    {
        let eventTime = document.getElementById("eventTime");
        eventTime.value = customEventTime;
        console.log("Event time: " + eventTime.value);
    }
});