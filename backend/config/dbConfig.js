const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL)

const connectionResult = mongoose.connection

connectionResult.on('error',()=>{
    console.log('Connection Error');
})

connectionResult.on('connected',()=>{
    console.log('Connected to database successfully');
})

module.exports = connectionResult;
