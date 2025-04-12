const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');

const eventSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    startTime: {
        type: [Number],
        required: true
    },
    endTime: {
        type: [Number],
        required: true
    },
    description: String,
    location: String,    
},{collection:'events',
    versionKey: false //here
 })

const eventModel = mongoose.model("events", eventSchema)

module.exports = eventModel