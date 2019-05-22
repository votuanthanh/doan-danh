var express = require('express');
var app = express();
var firebase = require('firebase');
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');

// app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

const firebaseConfig = {
  apiKey: "AIzaSyAPoSYgDMbvrLfilUgCMA_S9ZDj3ncYJ44",
  authDomain: "do-an-2811d.firebaseapp.com",
  databaseURL: "https://do-an-2811d.firebaseio.com",
  projectId: "do-an-2811d",
  storageBucket: "do-an-2811d.appspot.com",
  messagingSenderId: "280062861198",
  appId: "1:280062861198:web:e461b67491e2e604"
};

firebase.initializeApp(firebaseConfig);

// app.get('/', function (req, res) {
//   res.render('index', {is_open: '', error: null});
// })

app.get('/', function (req, res) {

  var referencePath = '/is_open';
  var userReference = firebase.database().ref(referencePath);

  userReference.on("value", 
    function(snapshot) {
      console.log(snapshot.val())
      res.render('index', {is_open: snapshot.val().is_open, error: null});
      userReference.off("value");
    }, 
    function (errorObject) {
      res.render('index', {is_open: 'null', error: 'Error, please try again'});
    });
});

//Update instance
app.put('/', function (req, res) {

  var is_open = req.body.is_open;
  var referencePath = '/is_open';
  var userReference = firebase.database().ref(referencePath);
  userReference.set({is_open: is_open}, 
    function(error) {
    if (error) {
      res.send("Data could not be saved." + error);
    } 
    else {
      res.send({is_open: 1});
    }
  });
});

//Update instance
app.post('/', function (req, res) {
  var is_open = req.body.is_open;
  var referencePath = '/is_open';
  var userReference = firebase.database().ref(referencePath);

  userReference.update({is_open: is_open}, 
    function(error) {
    if (error) {
      res.send("Data could not be saved." + error);
    } 
    else {
      res.send({is_open: is_open});
    }
  });
});

var server = app.listen(8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://localhost", host, port);
});
