var pubnub = require('pubnub');

module.exports = function() {

  var self = this;
  var mem = false;
  var default_channel = 'pubnub-rickshaw';

  var publish_key = "demo";
  var channel = default_channel;
  var interval_timeout = 1000;

  var pubnub = require("pubnub")({
    publish_key: publish_key
  });

  var megabyte = 1024 * 1024;
  var interval = false;
  
  var publish_mem = function() {
    
    mem = process.memoryUsage();

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
  
  self.start = function() {
    interval = setInterval(publish_mem, interval_timeout);
  };

  self.stop = function() {
    clearInterval(interval);
  };

  self.init = function(options) {

    publish_key = options.publish_key || "demo";
    channel = options.channel || default_channel;
    interval_timeout = options.timeout || "1000";
    
    self.start();

  };

  return self;

};