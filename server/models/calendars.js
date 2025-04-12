const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');

const calendarSchema = new mongoose.Schema({
    calendarName:{
        type: String,
        required: true
    },
    users: {
        type: [String],
        required: true
    }, 
},{collection:'calendars',
    versionKey: false //here
 })

const calendarModel = mongoose.model("calendars", calendarSchema)

module.exports = calendarModel