const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    currentLocation: {
        type: [Double],
        require:false
    },
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel

