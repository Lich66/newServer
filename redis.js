const bluebird = require('bluebird');
var redis = require("redis"),
    client = redis.createClient(6379, '192.168.1.21');
    bluebird.promisifyAll(redis);
// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });
client.set("testredis", "string val", redis.print);
client.getAsync('testredis').then(function(res) {
    console.log(res); // => 'bar'
});
