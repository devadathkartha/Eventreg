const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description: String,
    date: {
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    venue:{
        type:String,
        required:true,
    },
    capacity:{
        type:Number,
        required:true,
    },
    organizer:{
        type:String,
        required:true,
    },
    tags: [String],
    registrations: [{
        studentId: String,
        name: String,
        email: String,
        department: String,
        year: Number
    }]
});

module.exports = mongoose.model('Event', eventSchema);

/*
{
    "title":"ab12",
    "description":"vvv",
    "date":"12 july",
    "time":"6",
    "venue":"ffff",
    "capacity":7,
    "organizer":"de",
    "tags":["lol","lmao"]
}
*/
/*
{
    "studentId": "ha1",
    "name": "String",
    "email": "String",
    "department": "String",
    "year": 2017
}
*/