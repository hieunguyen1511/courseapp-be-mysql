const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config();

const userRouter = require('./routes/user');


app.use(bodyParser.json());

app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.send('vcl');
});




module.exports = app;