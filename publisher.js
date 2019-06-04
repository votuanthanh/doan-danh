var mqtt = require('mqtt');
var client1  = mqtt.connect('mqtt://test.mosquitto.org');
var client2  = mqtt.connect('mqtt://test.mosquitto.org');
var client3  = mqtt.connect('mqtt://test.mosquitto.org');
var count = 0;

client1.on('connect', function () {
  setInterval(function() {
    client1.publish('switch', `${++count}`);
    console.log('switch');
  }, 2000);
});

client2.on('connect', function () {
  setInterval(function() {
    // returns a temperature from 0 to 49
    var temperature = Math.floor(Math.random() * 50);
    client2.publish('temperature', `${temperature}`);
    console.log('temperature');
  }, 2000);
});

client3.on('connect', function () {
  setInterval(function() {
    // returns a temperature from 40 to 100
    var humidity = Math.floor(Math.random() * (100 - 40)) + 40;
    client3.publish('humidity', `${humidity}`);
    console.log('humidity');
  }, 2000);
});
