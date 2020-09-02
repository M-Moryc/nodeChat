const Parse = require('parse/node');
require('dotenv').config();

Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
Parse.initialize(
    process.env.PARSE_APP_ID, 
    process.env.PARSE_JS_KEY,
    process.env.PARSE_MASTER_KEY 
    
  );

class Message extends Parse.Object{
    constructor(){
        super('Message');
        
    }
}
Parse.Object.registerSubclass('Message', Message);

async function getMessages(){
    let query = new Parse.Query(Message);
    let array = await query.find();
    console.log(array);
    let messages = [];
    for (i in array) {
        messages.push(await query.get(array[i].id));
      }
      return messages;
}
function saveMessages(name, text){
    var message = new Message();
    return message.save({'name': name, 'text': text});
}



module.exports = {getMessages, saveMessages};