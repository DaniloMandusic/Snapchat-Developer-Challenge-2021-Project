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

// module.exports.nadjiDostupneArtikle = async function(){

//     const dostupniArtikli = await artikalModel.find({
//         broj_artikala : {$gt: 0}
//     }).exec();
//     if(dostupniArtikli.length == 0)
//     {
//         return null;
//     }

//     return dostupniArtikli;
// }

// Funkcija za azuriranje baze podataka
// module.exports.azurirajBrArtikalaUBP = async function(postId, postBrArtikala)
// {
//     let trazeniArtikal = await artikalModel.findOne({
//         _id: postId,
//     }).exec();
//     let noviBrArtikala =  trazeniArtikal.broj_artikala - postBrArtikala;
//     await artikalModel.updateOne({_id: postId} , {$set: {broj_artikala: noviBrArtikala}}).exec();
// }


// module.exports.dohvatiBrojArtikala = async function(postId, postBrojArtikala)
// {
//     const brojDostupnihArtikala = await artikalModel.findOne({

//             _id: postId,
      
//     }).exec();

//     if(brojDostupnihArtikala == null)
//     {
//         return false;
//     }
//     return true;
// }
