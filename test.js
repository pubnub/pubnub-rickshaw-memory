var pnrickmem = require('./app');

pnrickmem.init({
  dev: true,
  port: 1337
});

console.log('- starting encryption loop to illustrate memory deviation');

// a super slow function
function makeid() {

  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 5; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;

}

// increase memory usage artificially
setInterval(function(){

  console.log('-- encrypting');

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
  while(i < 10000) {
    encrypt(makeid());
    i++;
  }

  console.log('-- sleep');

}, 5000);
