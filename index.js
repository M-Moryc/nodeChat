const express = require('express'); 
const bodyParser = require('body-parser');
const app = express();
router = require('./routes');
require('dotenv').config();

const port = process.env.PORT || 3001;

app.set('port', port)
.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: false }))
.use(router);


app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
