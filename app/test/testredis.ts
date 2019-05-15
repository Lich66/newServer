import { redisClient } from '../db/redis';
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
redisClient.hgetallAsync('base').then((e) => {
    console.log(e);
});
