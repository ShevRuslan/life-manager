const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const router = require('./router')
const db = require('./db');
const DB = new db();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(passport.initialize());
app.use('/', router);

app.listen(3001, () => {
  DB.connect();
  console.log('We are live on ' + 3001);
});

