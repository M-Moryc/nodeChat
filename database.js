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

async function getMessages(roomName){
    room = await getRoom(roomName);
    console.log(room);
    query = new Parse.Query(Message);
    query.equalTo("roomId", room.id);
    array = await query.find();
    console.log(array);
    let messages = [];
    for (i in array) {
        messages.push(await query.get(array[i].id));
      }
      return messages;
}

async function saveMessages(name, text, roomName){
    var message = new Message();
    let room = await getRoom(roomName);
    console.log(room);
    return message.save({'name': name, 'text': text, 'roomId': room.id});
}

class Room extends Parse.Object{
    constructor(){
        super('Room');
        
    }
}
Parse.Object.registerSubclass('Room', Room);

function createRoom(name){
    let room = new Room();
    return room.save({'name': name});
}

async function getRoom(name){
    const query = new Parse.Query(Room);
    query.equalTo("name", name);
    const results = await query.find();
    let room = results[0];
    if(room === undefined){
        room = await createRoom(roomName);
    }
    
    return room;
}



module.exports = {getMessages, saveMessages, createRoom};