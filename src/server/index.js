const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');

const server = express();
// the value for dbname should match your database name
const dbname = 'Prison';

// serve files from the dist directory
server.use(express.static('dist'));

// the URL to the DB will be loaded from an env variable or using the MongoDB Clour
const dbroute = process.env.MONGODB_URL || 'mongodb+srv://ThiagoAdmin:Thi060741@cluster0.o3zpp.mongodb.net/Prison?retryWrites=true&w=majority';

let db;

// connect to the DB and then start the expres server
MongoClient.connect(dbroute, (err, client) => {
  if (err) throw err;

  db = client.db(dbname);
  // start the express web server listening
  server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
});

// bodyParser, parses the request body to be a readable json format
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// DEFINE ENDPOINTS

// retrieve all prisoners objects from DB
server.get('/api/General', (req, res) => {
  db.collection('General').find().toArray((err, result) => {
    if (err) throw err;
    // send the result
    res.send(result);
  });
});

// retrieve prisoners with specific ID from DB
server.get('/api/General/:id', (req, res) => {
  db.collection('General').findOne({_id: new ObjectID(req.params.id) }, (err, result) => {
    if (err) throw err;
    // send the result
    res.send(result);
  });
});

// retrieve prisoners with specific name from DB 
server.get('/api/GeneralInf/:firstName', (req, res) => {
  db.collection('General').find({firstName: req.params.firstName }).toArray((err, result) => {
    if (err) throw err;
    // send the result
    res.send(result);
  });
});

// delete prisoner with specific ID from DB
server.delete('/api/General', (req, res) => {
  db.collection('General').deleteOne( {_id: new ObjectID(req.body.id) }, err => {
    if (err) return res.send(err);
    // send the result
    return res.send({ success: true });
  });
});

// add prisoner based on info supplied in request body
server.post('/api/General', (req, res) => {
  db.collection('General').insertOne(req.body, (err, result) => {
    if (err) throw err;
    // redirection the page
    res.redirect('/prisoner/');
  });
});

// update prisoner based on info supplied in request body
server.put('/api/General', (req, res) => {
  // get the ID of the user to be updated
  const id  = req.body._id;
  // remove the ID so as not to overwrite it when updating
  delete req.body._id;
  // find a user matching this ID and update their details
  db.collection('General').updateOne( {_id: new ObjectID(id) }, {$set: req.body}, (err, result) => {
    if (err) throw err;
    // send the result
    return res.send({ success: true });
  });
});
