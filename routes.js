const express = require('express');
const router = new express.Router();
Message = require('./database');
io = require('./websocket');


router.get('/messages', (req, res) => {
    console.log("retreving messages");
    Message.find({},(err, messages) => {
      res.send(messages);
    })
});

router.post('/messages', (req, res) => {
    var message = new Message({
        name: req.body.name,
        text: req.body.text,
    });
    console.log(message);
    message.save()
    .then((data) =>{
        res.json(data);
        io.emit('message');
    })
  });

  module.exports = router;