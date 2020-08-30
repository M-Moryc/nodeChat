const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.uri;
const Message = mongoose.model('Message',{ name : String, text : String});


mongoose.connect(uri, err => {
    console.log('connected', err);
    
});
module.exports = Message;