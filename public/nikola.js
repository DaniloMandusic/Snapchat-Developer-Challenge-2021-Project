function getEventInfo(){
    const inputEventName = document.getElementById("inputEventName").value;
    const inputEventTime = document.getElementById("inputEventTime").value;
    const inputEventDescription = document.getElementById("inputEventDescription").value;
    const inputArray = [];
    inputArray.push(inputEventName, inputEventTime, inputEventDescription);
    return inputArray;
}

