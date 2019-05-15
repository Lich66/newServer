"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../db/redis");
// redisClient.hset('base', 'index', '1');
// setTimeout(() => {
//     console.log(redisClient.hgetall('base'));
// }, 2000);
// redisClient.set('a', 'b');
// redisClient.hsetAsync('aaaaaa', 'bbbbb', 'cccccc');
// redisClient.hget('aaaaaa', 'bbbbb', (e, r) => {
//     // console.log(JSON.stringify(e));
//     console.log(r);
// })
// redisClient.set('hello', 'This is a value');
// redisClient.get('hello', function (err, v) {
//     console.log('redis get hello err,v', err, v);
// })
// redisClient.hset('hash key', 'field 1', 'v1', print);
// redisClient.hget('hash key', 'field 1', print)
// redisClient.hget('hash key', 'field 1', (e, r) => {
//     console.log(r)
// })
// redisClient.hgetall('hash key', (err, items) => {
//     console.log(err, items);
// });
// // function print(err: Error | null, reply: any): void
// redisClient.hsetAsync('aaaaaa', 'bbbbb', 'cccccc');
// redisClient.hgetAsync('aaaaaa', 'bbbbb').then((r) => {
//     console.log(r)
// });
redis_1.redisClient.hgetallAsync('base').then((e) => {
    console.log(e);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdHJlZGlzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL3Rlc3QvdGVzdHJlZGlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQTBDO0FBQzFDLDBDQUEwQztBQUMxQyxxQkFBcUI7QUFDckIsZ0RBQWdEO0FBQ2hELFlBQVk7QUFDWiw2QkFBNkI7QUFDN0Isc0RBQXNEO0FBQ3RELGtEQUFrRDtBQUNsRCx5Q0FBeUM7QUFDekMsc0JBQXNCO0FBQ3RCLEtBQUs7QUFDTCwrQ0FBK0M7QUFFL0MsK0NBQStDO0FBQy9DLG9EQUFvRDtBQUNwRCxLQUFLO0FBRUwsd0RBQXdEO0FBQ3hELGlEQUFpRDtBQUNqRCxzREFBc0Q7QUFDdEQscUJBQXFCO0FBQ3JCLEtBQUs7QUFDTCxvREFBb0Q7QUFDcEQsK0JBQStCO0FBQy9CLE1BQU07QUFDTix5REFBeUQ7QUFDekQsc0RBQXNEO0FBQ3RELHlEQUF5RDtBQUN6RCxxQkFBcUI7QUFDckIsTUFBTTtBQUNOLG1CQUFXLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkIsQ0FBQyxDQUFDLENBQUMifQ==