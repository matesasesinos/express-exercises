const express = require('express');
const app = express();

//enviroment vars (.env file)
require('dotenv').config({ path: '.env' });

//require all routes
const router = require('./routes');


//call all routes
app.use('/', router());


//port configured in .evn file
const port = process.env.PORT;

app.listen(port, () => {
  console.log("Start app in port: " + port);
});