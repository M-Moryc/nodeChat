const express = require('express');
const router = new express.Router();
const asyncHandler = require('express-async-handler');
const {getMessages, saveMessages} = require('./database');
io = require('./websocket');


router.get('/', (req, res) => {
    res.send('');
});

router.get('/messages', asyncHandler(async (req, res, next) => {
    console.log("retreving messages");
    data = await getMessages();
    res.send(data);
}));

router.post('/messages', (req, res) => {
    console.log('received message');
    saveMessages(req.body.name, req.body.text)
    .then((data) =>{
        console.log(data);
        res.json(data);
        io.emit('message');
    })
  });

  module.exports = router;