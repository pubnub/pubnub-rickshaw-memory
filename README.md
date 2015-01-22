# PubNub-Rickshaw-Memory

![](http://i.imgur.com/yDsJL0X.gif)

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

![](http://i.imgur.com/Ecowbb1.png)

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

## Dev Mode

When ```dev: true``` is enabled in options, the module will spawn an express server on localhost using the supplied ```port```. This is a simple static server that already includes the contents of [pubnub-rickshaw](https://github.com/pubnub/pubnub-rickshaw).

## Customization

You can customize your graph by configuring [pubnub-rickshaw](https://github.com/pubnub/pubnub-rickshaw) to subscribe the the same channel supplied in options.
