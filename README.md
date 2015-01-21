# PubNub-Rickshaw-Memory

![](http://i.imgur.com/Ecowbb1.png)

Monitor your NodeJS memory usage with PubNub. Plugs right into [pubnub-rickshaw](https://github.com/pubnub/pubnub-rickshaw) for easy realtime charts.

## Quickstart

Install with npm.

```
npm install pubnub-rickshaw-memory
```

Include in your app with ```{dev: true}```.

```js
var pnrickmem = require('./app');
pnrickmem.init({dev: true});
```

That's it! Now when you run your node app, you should see the following:

```
----------------------
pubnub-rickshaw-memory
----------------------

Monitor this instance:

http://localhost:1337?pnrickmem-bff2c45e-ab44-4204-92e3-bd69048502c0

----------------------
```

Visit the url to see a realtime graph of your NodeJS memory profile over time.

## Options

Sent as an object during ```init()```.

```
pnrickmem.init({
  publish_key: 'demo',
  channel: uuid(),
  interval_timeout: 1000
  dev_mode: false,
  port: 3333
});
```

| Parameter|Details|Type|Default|
|------------------|-----------------------------------------------------------------|---------|------------------|
| publish_key      | Your PubNub publish key                                         | string  | ```'demo'```     |
| channel          | Your PubNub channel                                             | string  | ```uuid.v4();``` |
| interval_timeout | Delay between memory publishes                                  | integer | ```1000```       |
| dev_mode         | Enable development mode                                         | boolean | ```false```      |
| port             | Port number for express server spawned when dev mode is enabled | integer | ```3333```       |

## How it works

NodeJS memory usage is exposed through ```process.memoryUsage()```. 

Every ```interval_timeout``` the module publishes the current output of ```process.memoryUsage()``` to the supplied ```publish_key``` and ```channel``` on the PubNub network. [Read more about PubNub here](http://pubnub.com).

### Dev Mode

When ```dev: true``` is supplied in options, the module will spawn an express server on localhost using the supplied ```port```. This is a simple static server that already includes the contents of [pubnub-rickshaw](https://github.com/pubnub/pubnub-rickshaw).

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
