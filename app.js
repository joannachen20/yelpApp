let express = require('express');
let app = express();
let ejs = require('ejs');
var config = require('./config.js');
const bodyParser = require('body-parser');
let request = require('request');
//let yelpAPI = require('yelp-api');
let apiKey = '[API_KEY]';
const yelp = require('yelp-fusion');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log("loading. . .");
});

app.set('view engine', 'ejs');

app.get('', (req, res) => {
  res.render('index', {results: null, error: null});
})

'use strict';

app.post('/', (req, res) => {
let term = req.body.term;
let location = req.body.location;
let searchRequest = {
  // term: `${term}`,
  // location: `${location}`
  term:` ${term}`,
  location: `${location}`
};
const client = yelp.client(apiKey);
client.search(searchRequest).then(response => {
  console.log(response);
  const result = response.jsonBody.businesses[0].name;
  let output = `Your first match is ${result}`;
  res.render('index', {results: output, error: null});
}).catch(err => {
  console.log(err);
});
});

// app.post('/', (req, res) => {
//   let term = req.body.term;
//   let location = req.body.location;
//   //let url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}`;
//   let options = {
//     method: 'GET',
//     url: `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}`,
//     headers: {
//       Authorization: 'Bearer ' + apiKey }
//      };
// request(options, (err, response, body) => {
//   if(err) {
//     res.render('index', {results: null, error: 'Error'})
//   } else {
//     let results = JSON.parse(body);
//     console.log(results);
//     //let firstMatch = `Your first match is ${results.businesses[0].name}`;
//     //res.render('index', {results: firstMatch, error: null});
//   }
//   })
// });

// app.post('/', (req, res) => {
//   let term = req.body.term;
//   let location = req.body.location;
//   let url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}`;
//   request(url, (err, response, body) => {
//     if(err) {
//       res.render('index', {results: null, error: 'Error'})
//     } else {
//       let data = JSON.parse(body);
//       console.log(data);
//     }
//   })
// });

// app.post('/', (req, res, next) => {
//   let term = req.body.term;
//   let location = req.body.location;
//   let url = `https://api.yelp.com/v3/businesses/search?location=${location}&term=${term}`;
//   request(url, (err, response, body) => {
//     if (err) {
//       res.render('index', {results: null, error: 'error'});
//     } else {
//       let data = JSON.parse(body);
//       //let firstMatch = `Your first match is ${response.jsonBody.businesses[0].name}`;
//       //res.render('index', {results: firstMatch, error: null});
//       console.log(data);
//     }
//   });
// });
// app.post('/', (req, res) => {
//   let params = [{ location: '${loc}' }];
//   let loc = req.body.loc;
//   let url = 'https://api.yelp.com/v3/businesses/search';
//   //let term = req.body.term;
//   request(url, (err, res, body) => {
//     yelp.query('businesses/search', params)
//     .then(data => {
//       // Success
//       let results = JSON.parse(data);
//       console.log(results);
//       let firstMatch = `Your first match is ${results.businesses[0].name}`;
//         res.render('index', {results: firstMatch, error: null});
//         //console.log(results.name);
//     })
//     .catch(err => {
//       // Failure
//       console.log(err);
//     });
//   });
// });
