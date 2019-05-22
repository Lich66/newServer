"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../db/redis");
redis_1.redisClient.hgetallAsync('base').then((e) => {
    console.log(e);
});
// // 批量插入
// redisClient.hmsetAsync('zhjtest', { 'hmsetAsync3': '3', 'parm1': 'parm1', 'parm2': 'parm2', 'parm3': 'parm3' }).then((r) => {
//     console.log(r);
// });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdHJlZGlzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL3Rlc3QvdGVzdHJlZGlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQTBDO0FBRTFDLG1CQUFXLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkIsQ0FBQyxDQUFDLENBQUM7QUFHSCxVQUFVO0FBQ1YsZ0lBQWdJO0FBQ2hJLHNCQUFzQjtBQUN0QixNQUFNO0FBQ04sUUFBUTtBQUVSLHNEQUFzRDtBQUV0RCxvREFBb0Q7QUFFcEQsUUFBUTtBQUNSLDREQUE0RDtBQUM1RCxzQkFBc0I7QUFDdEIsTUFBTTtBQUNOLFVBQVU7QUFDVixvREFBb0Q7QUFDcEQsc0JBQXNCO0FBQ3RCLE1BQU07QUFDTixXQUFXO0FBQ1gsNkRBQTZEO0FBQzdELHNCQUFzQjtBQUN0QixNQUFNO0FBQ04sU0FBUztBQUNULG9DQUFvQztBQUVwQyxXQUFXO0FBQ1gsNERBQTREO0FBQzVELHNCQUFzQjtBQUN0QixNQUFNO0FBRU4sb0RBQW9EO0FBQ3BELHNCQUFzQjtBQUN0QixNQUFNO0FBRU4sV0FBVztBQUNYLDZEQUE2RDtBQUM3RCxzQkFBc0I7QUFDdEIsTUFBTTtBQUVOLHdEQUF3RDtBQUN4RCxzQkFBc0I7QUFDdEIsTUFBTTtBQUNOLFNBQVM7QUFDVCw4REFBOEQ7QUFDOUQsc0JBQXNCO0FBQ3RCLE1BQU07QUFFTix3REFBd0Q7QUFDeEQsc0JBQXNCO0FBQ3RCLE1BQU07QUFDTixvQkFBb0I7QUFDcEIsUUFBUTtBQUNSLHdFQUF3RTtBQUN4RSxzQkFBc0I7QUFDdEIsTUFBTTtBQUNOLGFBQWE7QUFDYixrREFBa0Q7QUFDbEQsc0JBQXNCO0FBQ3RCLE1BQU07QUFDTixhQUFhO0FBQ2IsaURBQWlEO0FBQ2pELHNCQUFzQjtBQUN0QixNQUFNO0FBQ04sVUFBVTtBQUNWLDJEQUEyRDtBQUMzRCxzQkFBc0I7QUFDdEIsTUFBTTtBQUNOLDZEQUE2RDtBQUM3RCxzQkFBc0I7QUFDdEIsTUFBTTtBQUNOLG9FQUFvRTtBQUNwRSxzQkFBc0I7QUFDdEIsTUFBTTtBQUNOLGFBQWE7QUFDYixrREFBa0Q7QUFDbEQsc0JBQXNCO0FBQ3RCLE1BQU07QUFHTjs7R0FFRztBQUNILE9BQU87QUFHUCxnRUFBZ0U7QUFDaEUsc0JBQXNCO0FBQ3RCLE1BQU07QUFDTix1REFBdUQ7QUFDdkQsc0JBQXNCO0FBQ3RCLEtBQUs7QUFFTCxxREFBcUQ7QUFDckQsc0JBQXNCO0FBQ3RCLE1BQU07QUFDTiwyREFBMkQ7QUFDM0Qsc0JBQXNCO0FBQ3RCLEtBQUs7QUFDTCwwRUFBMEU7QUFDMUUsc0JBQXNCO0FBQ3RCLEtBQUs7QUFDTCw0REFBNEQ7QUFDNUQsc0JBQXNCO0FBQ3RCLEtBQUs7QUFDTCwyQ0FBMkM7QUFDM0Msc0JBQXNCO0FBQ3RCLGtDQUFrQztBQUNsQyx1REFBdUQ7QUFDdkQsOEJBQThCO0FBQzlCLGNBQWM7QUFDZCxRQUFRO0FBQ1IsTUFBTTtBQUNOLDJEQUEyRDtBQUMzRCxxQkFBcUI7QUFDckIsS0FBSztBQUNMLCtEQUErRDtBQUMvRCxxQkFBcUI7QUFDckIsTUFBTTtBQUNOLDJEQUEyRDtBQUMzRCxxQkFBcUI7QUFDckIsS0FBSztBQUNMLCtEQUErRDtBQUMvRCxxQkFBcUI7QUFDckIsTUFBTTtBQUNOLDBEQUEwRDtBQUMxRCxxQkFBcUI7QUFDckIsTUFBTTtBQUNOLHFEQUFxRDtBQUNyRCxxQkFBcUI7QUFDckIsTUFBTTtBQUNOLCtEQUErRDtBQUMvRCxxQkFBcUI7QUFDckIsTUFBTTtBQUNOLCtEQUErRDtBQUMvRCxxQkFBcUI7QUFDckIsTUFBTTtBQUNOLCtEQUErRDtBQUMvRCxxQkFBcUI7QUFDckIsTUFBTTtBQUNOLDZEQUE2RDtBQUM3RCxxQkFBcUI7QUFDckIsTUFBTTtBQUNOLCtEQUErRDtBQUMvRCxxQkFBcUI7QUFDckIsTUFBTTtBQUNOLHFEQUFxRDtBQUNyRCxxQkFBcUI7QUFDckIsTUFBTTtBQUNOLCtEQUErRDtBQUMvRCxxQkFBcUI7QUFDckIsTUFBTTtBQUVOLDJEQUEyRDtBQUMzRCxzQkFBc0I7QUFDdEIsTUFBTTtBQUNOLCtEQUErRDtBQUMvRCxzQkFBc0I7QUFDdEIsTUFBTTtBQUNOLGdFQUFnRTtBQUNoRSxzQkFBc0I7QUFDdEIsTUFBTTtBQUNOLCtEQUErRDtBQUMvRCxxQkFBcUI7QUFDckIsTUFBTTtBQUNOLHFEQUFxRDtBQUNyRCx5Q0FBeUM7QUFDekMsTUFBTSJ9