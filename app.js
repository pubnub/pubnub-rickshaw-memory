var pubnub = require('pubnub');
var express = require('express');
var uuid = require('node-uuid');
var colors = require('colors');

var mem = false;

// set defaults
var publish_key = "demo";
var channel = 'pnrickmem-' + uuid.v4();
var interval_timeout = 1000;
var dev_mode = false;
var port = 3345;

// init pubnub
var pubnub = require("pubnub")({
  publish_key: publish_key
});

var megabyte = 1024 * 1024;
var interval = false;

var publish_mem = function() {
  
  mem = process.memoryUsage();

  // publish to pubnub
  pubnub.publish({
    channel: channel,
    message: {
      y: [
        Math.ceil(mem.rss / megabyte * 100) / 100, 
        Math.ceil(mem.heapTotal / megabyte * 100) / 100,
        Math.ceil(mem.heapUsed / megabyte * 100) / 100
      ],
      x: new Date().getTime() / 1000
    }
  });

};

var start = function() {
  interval = setInterval(publish_mem, interval_timeout);
};

var stop = function() {
  clearInterval(interval);
};

var server = function() {

  var app = express();

  app.use(express.static(__dirname + '/test'));
  app.listen(port);

  console.log('');
  console.log('----------------------')
  console.log('pubnub-rickshaw-memory'.red);
  console.log('----------------------')
  console.log('');
  console.log('Monitor this instance:');
  console.log('');
  console.log('http://localhost:' + String(port) + '?' + channel.red);
  console.log('');
  console.log('----------------------')
  console.log('');

}

var init = function(options) {

  if(typeof options !== "undefined") {
  
    publish_key = options.publish_key || publish_key;
    channel = options.channel || channel;
    interval_timeout = options.timeout || interval_timeout;
    dev_mode = options.dev || dev_mode;
    port = options.port || port;

    if(dev_mode) {
      server();
    }

  }

  start();

};

module.exports = {
  start: start,
  stop: stop,
  init: init
};