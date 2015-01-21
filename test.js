var pnrickmem = require('./app');

// server
var express = require('express');

var server = express();
server.use(express.static(__dirname + '/public'));
server.listen(3000);

if (process.pid) {
  console.log('This process is your pid ' + process.pid);
}

// console.log('This platform is ' + process.platform);

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

// blocker
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
  while(i < 1000) {
    encrypt(makeid());
    i++;
  }

  console.log('DONE');

}, 5000);
