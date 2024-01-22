const mongoose = require('mongoose')
const mongodbURI = 'mongodb://localhost:27017/iNotes?directConnection=true&tls=false'; 

const connectWithMongo = async () =>{
    await mongoose.connect(mongodbURI); 
    console.log("COnnected with DB")
}

module.exports = connectWithMongo;

