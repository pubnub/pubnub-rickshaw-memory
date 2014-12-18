process.memoryUsage()#
Returns an object describing the memory usage of the Node process measured in bytes.

var util = require('util');

console.log(util.inspect(process.memoryUsage()));
This will generate:

{ rss: 4935680,
  heapTotal: 1826816,
  heapUsed: 650472 }
