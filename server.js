var express = require('express');
var app = express();
var firebase = require('firebase');
var bodyParser = require('body-parser');
var mqtt = require('mqtt')
var client1  = mqtt.connect('mqtt://test.mosquitto.org')
var client2  = mqtt.connect('mqtt://test.mosquitto.org')
var client3  = mqtt.connect('mqtt://test.mosquitto.org')

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

client1.on('connect', function () {
  client1.subscribe('switch')
})

client1.on('message', function (topic, message) {
  var is_open = message.toString();
  console.log(is_open);
  var referencePath = '/is_open';
  var userReference = firebase.database().ref(referencePath);
  userReference.update({is_open: is_open});
})

client2.on('connect', function () {
  client2.subscribe('temperature')
})

client2.on('message', function (topic, message) {
  var temperature = message.toString();
  console.log(temperature);
  var referencePath = '/temperature';
  var userReference = firebase.database().ref(referencePath);
  userReference.set({temperature});
})

client3.on('connect', function () {
  client3.subscribe('humidity')
})

client3.on('message', function (topic, message) {
  var humidity = message.toString()
  console.log(humidity)
  var referencePath = '/humidity'
  var userReference = firebase.database().ref(referencePath);
  userReference.set({humidity});
})

var server = app.listen(8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://localhost", host, port);
});
