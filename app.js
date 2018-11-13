let express = require('express');
let app = express();
let fs = require('fs');
let data = require('./data.json');
let ejs = require('ejs');
let config = require('./config.js');
const bodyParser = require('body-parser');
let request = require('request');
//let yelpAPI = require('yelp-api');
let apiKey = '[API_KEY]';
const yelp = require('yelp-fusion');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'))

app.listen(3000, () => {
    console.log("loading. . .");
});

app.set('view engine', 'ejs');

app.get('/login', (req, res) => {
  res.render('login');
})

app.get('/index', (req, res) => {
res.render('index', {results: null, error: null});
})

'use strict';

app.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let user = {
    email: `${email}`,
    password: `${password}`
  };
  let info = JSON.stringify(user);
  fs.appendFile('data.json', info);
  console.log("User saved.")
  res.redirect('/index');
});

app.post('/index', (req, res) => {
let term = req.body.term;
let location = req.body.location;
let searchRequest = {
  term:` ${term}`,
  location: `${location}`
}
const client = yelp.client(apiKey);
client.search(searchRequest).then(response => {
  //console.log(response);
  const result = response.jsonBody.businesses[0].name;
  let output = `Your first match is ${result}`;
  res.render('index', {results: output, error: null});
}).catch(err => {
  console.log(err);
});
});
