const mongoose = require('mongoose');

const connectDB = async () => {

    try{
        const conn = await mongoose.connect(
            'mongodb+srv://ascarecircle:QyKfCelvabgXNyXM@carecircle.uzmuq.mongodb.net/CareCircle?retryWrites=true&w=majority&appName=CareCircle');
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }
    catch(error){
        console.error(error)
        process.exit(1)
    }

};

module.exports = connectDB;