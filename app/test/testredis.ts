import { redisClient } from '../db/redis';

// redisClient.hgetallAsync('base').then((e) => {
//     console.log(e);
// });


// 批量插入
// redisClient.hmsetAsync('zhjtest', { 'hmsetAsync3': '3', 'parm1': 'parm1', 'parm2': 'parm2', 'parm3': 'parm3' }).then((r) => {
//     console.log(r);
// });

// redisClient.('adssad', [{ a: 'b' }])
// // 插入

// redisClient.hsetAsync('user_502', 'userid', '502');

// redisClient.hsetAsync('zhjtest', 'float', '1.5');

// // 获取
// redisClient.hgetAsync('user_502', 'userid').then((r) => {
//     console.log(r);
// });
// // 获取全部
// redisClient.hgetallAsync('zhjtest').then((r) => {
//     console.log(r);
// });
// // 检查有没有
// redisClient.hexistsAsync('zhjtest', 'parm3').then((r) => {
//     console.log(r);
// });
// //  删除
// redisClient.delAsync('user_502');

// // // 获取
// redisClient.hgetAsync('user_502', 'userid').then((r) => {
//     console.log(r);
// });

// redisClient.hgetallAsync('zhjtest').then((r) => {
//     console.log(r);
// });

// // 检查有没有
// redisClient.hexistsAsync('zhjtest', 'parm3').then((r) => {
//     console.log(r);
// });

// redisClient.hgetAsync('zhjtest', 'int').then((r) => {
//     console.log(r);
// });
// //  加法
// redisClient.hincrbyAsync('zhjtest', 'int', 1).then((r) => {
//     console.log(r);
// });

// redisClient.hgetAsync('zhjtest', 'int').then((r) => {
//     console.log(r);
// });
// const ling = 0.5;
// // 加法
// redisClient.hincrbyfloatAsync('zhjtest', 'float', ling).then((r) => {
//     console.log(r);
// });
// // 批量获取key
// redisClient.hkeysAsync('zhjtest').then((r) => {
//     console.log(r);
// });
// //  获取字段数量
// redisClient.hlenAsync('zhjtest').then((r) => {
//     console.log(r);
// });
// // 批量获取
// redisClient.hmgetAsync('zhjtest', 'parm1').then((r) => {
//     console.log(r);
// });
// redisClient.hmgetAsync('zhjtest', ['parm2']).then((r) => {
//     console.log(r);
// });
// redisClient.hmgetAsync('zhjtest', ['parm3', 'int']).then((r) => {
//     console.log(r);
// });
// // 获取value
// redisClient.hvalsAsync('zhjtest').then((r) => {
//     console.log(r);
// });


/**
 * list
 */
// 获取列表


// redisClient.ltrimAsync('zhjtestlist', 100, 101).then((r) => {
//     console.log(r);
// });
// redisClient.lpushxAsync('dsadsa', 'a').then((r) => {
//     console.log(r);
// })

// redisClient.llenAsync('zhjtestlist').then((r) => {
//     console.log(r);
// });
// redisClient.lpushAsync('zhjtestlist', 'a').then((r) => {
//     console.log(r);
// })
// redisClient.lpushAsync('zhjtestlist', 'b', 'c', 'd', 'e').then((r) => {
//     console.log(r);
// })
// redisClient.lpushxAsync('zhjtestlist', 'x').then((r) => {
//     console.log(r);
// })
// redisClient.keysAsync('*').then((r) => {
//     console.log(r);
//     for (const iterator of r) {
//         redisClient.delAsync(iterator).then((s) => {
//             console.log(s);
//         });
//     }
// });
// redisClient.blpopAsync('zhjtestlist', 100).then((r) => {
//     console.log(r)
// })
// redisClient.lrangeAsync('zhjtestlist', 0, 100).then((r) => {
//     console.log(r)
// });
// redisClient.brpopAsync('zhjtestlist', 100).then((r) => {
//     console.log(r)
// })
// redisClient.lrangeAsync('zhjtestlist', 0, 100).then((r) => {
//     console.log(r)
// });
// redisClient.lindexAsync('zhjtestlist', 0).then((r) => {
//     console.log(r)
// });
// redisClient.lpopAsync('zhjtestlist').then((r) => {
//     console.log(r)
// });
// redisClient.lrangeAsync('zhjtestlist', 0, 100).then((r) => {
//     console.log(r)
// });
// redisClient.lremAsync('zhjtestlist', 100, 'c').then((r) => {
//     console.log(r)
// });
// redisClient.lrangeAsync('zhjtestlist', 0, 100).then((r) => {
//     console.log(r)
// });
// redisClient.lsetAsync('zhjtestlist', 1, 'f').then((r) => {
//     console.log(r)
// });
// redisClient.lrangeAsync('zhjtestlist', 0, 100).then((r) => {
//     console.log(r)
// });
// redisClient.rpopAsync('zhjtestlist').then((r) => {
//     console.log(r)
// });
// redisClient.lrangeAsync('zhjtestlist', 0, 100).then((r) => {
//     console.log(r)
// });

// redisClient.rpushAsync('zhjtestlist', 'e').then((r) => {
//     console.log(r);
// });
// redisClient.lrangeAsync('zhjtestlist', 0, 100).then((r) => {
//     console.log(r);
// });
// redisClient.rpushAsync('zhjtestlist', 'f', 'g').then((r) => {
//     console.log(r);
// });
// redisClient.lrangeAsync('zhjtestlist', 0, 100).then((r) => {
//     console.log(r)
// });
// redisClient.llenAsync('zhjtestlist').then((r) => {
//     console.log(r + ' ; ' + typeof r);
// });
redisClient.flushall();
