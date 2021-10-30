const model = require('../models/event');
const cryptoLib = require('../crypto');
const uriMaker = require('../uriMaker');
const request = require('request');

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

async function searchForEvent(req, res, next)
{
    try
    {
        const eventSlug = req.body.search;
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

var clientId = "92308228-fa84-4ab9-91b4-f025e380cd36";

var clientSecret = "GvuesZ9ZagFc0h_ID_1E8J8BKUu41BCVN2gLLglHkM0";

var redirectUri = "http://localhost:3000/login/";

var scopeList = [ 
    "https://auth.snapchat.com/oauth2/api/user.display_name",
    "https://auth.snapchat.com/oauth2/api/user.bitmoji.avatar"
];

function authorize(req, res, next)
{
// Generate query parameters

var state = cryptoLib.generateClientState();


// Build redirect URL

var getRedirectURL = uriMakera.getAuthCodeRedirectURL(

  clientId,

  redirectUri,

  scopeList,

  state

);


// Redirect user to get consent

res.redirect(getRedirectURL);
}

function accesTokenHandler(req, res ,next)
{
    var SNAPCHAT_AUTH_ENDPOINT =

    "https://accounts.snapchat.com/accounts/oauth2/token";

  var auth_code = "received-auth-code-xyz";


  var authorizationHeader = clientId + ":" + clientSecret;

  var authorizationHeaderBase64 = Buffer.from(authorizationHeader).toString(

    "base64"

  );


  // Set headers

  var headers = {

    "Content-Type": "application/x-www-form-urlencoded",

    Authorization: "Basic " + authorizationHeaderBase64,

  };


  // Configure access token POST request

  var options = {

    url: SNAPCHAT_AUTH_ENDPOINT,

    method: "POST",

    headers: headers,

    form: {

      grant_type: "authorization_code",

      code: auth_code,

      redirect_uri: redirectUri,

      client_id: clientId,

    },

  };


  // Start POST request

  request(options, function (error, response, body) {

    // Handle success and  error responses here
    console.log("response " + response);
    console.log("body : " + body);
    // Make sure to persist access_token, refresh_token, and expires_in

    res.send(response);

  });
}

module.exports = {
    showEvent,
    getEventInfo,
    mainPage,
    searchForEvent,
    makeEvent,
    showLogin,
    authorize
};