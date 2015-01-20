var util = require('util');
var pubnub = require('pubnub');

var pubnub = require("pubnub")({
    publish_key   : "demo",
    subscribe_key : "demo"
});

if (process.pid) {
  console.log('This process is your pid ' + process.pid);
}

console.log('This platform is ' + process.platform);


var megabyte = 1024 * 1024;
setInterval(function(){

  var mem = process.memoryUsage();

  console.log(mem.heapUsed / megabyte);

  pubnub.publish({
    channel: 'pubnub-brainpower',
    message: {
      y: [
        Math.ceil(mem.rss / megabyte * 100) / 100, 
        Math.ceil(mem.heapTotal / megabyte * 100) / 100,
        Math.ceil(mem.heapUsed / megabyte * 100) / 100
      ],
      x: new Date().getTime() / 1000
    }
  });

}, 500);

var express = require('express');
var server = express(); // better instead
server.use(express.static(__dirname + '/public'));
server.listen(3000);

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

setInterval(function(){

  console.log('ENCRYPTING');

  var crypto = require('crypto'),
      algorithm = 'aes-256-ctr',
      password = makeid();

  function encrypt(text){
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
  }

  var i=0;
  while(i < 1000000) {
    encrypt(makeid());
    i++;
  }

  console.log('DONE');

}, 5000);


// And regarding rss, vsize, heapTotal, heapUsed... vsize is the entire size of 
// memory that your process is using and rss is how much of that is in actual 
// physical RAM and not swap. heaptotal and heapUsed refer to v8's underlying 
// storage that you have no control of. You'll mostly be concerned with vsize, 
// but you can also get more detailed information with top or Activity Monitor
// on OS X (anyone know of good process visualization tools on *nix systems?

  /*

  vsize = virtual size a.k.a. total size, pages may be lazily loaded or
  swapped out
  rss = residential set a.k.a. the pages that are actually in memory,
  subset of vsize
  heap(Total|Used) = the chunk of memory that's used for dynamic
  allocations, also a subset of the vsize

  Heap: Current heap size (MB)

RSS: Resident set size (MB)

V8 Full GC: Heap size sampled immediately after a full garbage collection (MB)
*/
