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
redis_1.redisClient.hsetAsync('user_502', 'userid', '502');
// redisClient.hsetAsync('zhjtest', 'float', '1.5');
// // 获取
redis_1.redisClient.hgetAsync('zhjtest', 'parm1').then((r) => {
    console.log(r);
});
// // 获取全部
// redisClient.hgetallAsync('zhjtest').then((r) => {
//     console.log(r);
// });
// // 检查有没有
// redisClient.hexistsAsync('zhjtest', 'parm3').then((r) => {
//     console.log(r);
// });
// //  删除
// redisClient.hdelAsync('zhjtest', 'parm3');
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
// redisClient.lrangeAsync('zhjtestlist', 0, 100).then((r) => {
//     console.log(r)
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
//     console.log(r)
// });
// redisClient.lrangeAsync('zhjtestlist', 0, 100).then((r) => {
//     console.log(r)
// });
// redisClient.rpushAsync('zhjtestlist', 'f', 'g').then((r) => {
//     console.log(r)
// });
// redisClient.lrangeAsync('zhjtestlist', 0, 100).then((r) => {
//     console.log(r)
// });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdHJlZGlzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL3Rlc3QvdGVzdHJlZGlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQTBDO0FBRTFDLG1CQUFXLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkIsQ0FBQyxDQUFDLENBQUM7QUFHSCxVQUFVO0FBQ1YsZ0lBQWdJO0FBQ2hJLHNCQUFzQjtBQUN0QixNQUFNO0FBQ04sUUFBUTtBQUVSLG1CQUFXLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFFbkQsb0RBQW9EO0FBRXBELFFBQVE7QUFDUixtQkFBVyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuQixDQUFDLENBQUMsQ0FBQztBQUNILFVBQVU7QUFDVixvREFBb0Q7QUFDcEQsc0JBQXNCO0FBQ3RCLE1BQU07QUFDTixXQUFXO0FBQ1gsNkRBQTZEO0FBQzdELHNCQUFzQjtBQUN0QixNQUFNO0FBQ04sU0FBUztBQUNULDZDQUE2QztBQUU3QyxvREFBb0Q7QUFDcEQsc0JBQXNCO0FBQ3RCLE1BQU07QUFFTixXQUFXO0FBQ1gsNkRBQTZEO0FBQzdELHNCQUFzQjtBQUN0QixNQUFNO0FBRU4sd0RBQXdEO0FBQ3hELHNCQUFzQjtBQUN0QixNQUFNO0FBQ04sU0FBUztBQUNULDhEQUE4RDtBQUM5RCxzQkFBc0I7QUFDdEIsTUFBTTtBQUVOLHdEQUF3RDtBQUN4RCxzQkFBc0I7QUFDdEIsTUFBTTtBQUNOLG9CQUFvQjtBQUNwQixRQUFRO0FBQ1Isd0VBQXdFO0FBQ3hFLHNCQUFzQjtBQUN0QixNQUFNO0FBQ04sYUFBYTtBQUNiLGtEQUFrRDtBQUNsRCxzQkFBc0I7QUFDdEIsTUFBTTtBQUNOLGFBQWE7QUFDYixpREFBaUQ7QUFDakQsc0JBQXNCO0FBQ3RCLE1BQU07QUFDTixVQUFVO0FBQ1YsMkRBQTJEO0FBQzNELHNCQUFzQjtBQUN0QixNQUFNO0FBQ04sNkRBQTZEO0FBQzdELHNCQUFzQjtBQUN0QixNQUFNO0FBQ04sb0VBQW9FO0FBQ3BFLHNCQUFzQjtBQUN0QixNQUFNO0FBQ04sYUFBYTtBQUNiLGtEQUFrRDtBQUNsRCxzQkFBc0I7QUFDdEIsTUFBTTtBQUdOOztHQUVHO0FBQ0gsT0FBTztBQUdQLGdFQUFnRTtBQUNoRSxzQkFBc0I7QUFDdEIsTUFBTTtBQUNOLHVEQUF1RDtBQUN2RCxzQkFBc0I7QUFDdEIsS0FBSztBQUVMLHFEQUFxRDtBQUNyRCxzQkFBc0I7QUFDdEIsTUFBTTtBQUNOLDJEQUEyRDtBQUMzRCxzQkFBc0I7QUFDdEIsS0FBSztBQUNMLDBFQUEwRTtBQUMxRSxzQkFBc0I7QUFDdEIsS0FBSztBQUNMLDREQUE0RDtBQUM1RCxzQkFBc0I7QUFDdEIsS0FBSztBQUNMLCtEQUErRDtBQUMvRCxxQkFBcUI7QUFDckIsTUFBTTtBQUNOLDJEQUEyRDtBQUMzRCxxQkFBcUI7QUFDckIsS0FBSztBQUNMLCtEQUErRDtBQUMvRCxxQkFBcUI7QUFDckIsTUFBTTtBQUNOLDJEQUEyRDtBQUMzRCxxQkFBcUI7QUFDckIsS0FBSztBQUNMLCtEQUErRDtBQUMvRCxxQkFBcUI7QUFDckIsTUFBTTtBQUNOLDBEQUEwRDtBQUMxRCxxQkFBcUI7QUFDckIsTUFBTTtBQUNOLHFEQUFxRDtBQUNyRCxxQkFBcUI7QUFDckIsTUFBTTtBQUNOLCtEQUErRDtBQUMvRCxxQkFBcUI7QUFDckIsTUFBTTtBQUNOLCtEQUErRDtBQUMvRCxxQkFBcUI7QUFDckIsTUFBTTtBQUNOLCtEQUErRDtBQUMvRCxxQkFBcUI7QUFDckIsTUFBTTtBQUNOLDZEQUE2RDtBQUM3RCxxQkFBcUI7QUFDckIsTUFBTTtBQUNOLCtEQUErRDtBQUMvRCxxQkFBcUI7QUFDckIsTUFBTTtBQUNOLHFEQUFxRDtBQUNyRCxxQkFBcUI7QUFDckIsTUFBTTtBQUNOLCtEQUErRDtBQUMvRCxxQkFBcUI7QUFDckIsTUFBTTtBQUVOLDJEQUEyRDtBQUMzRCxxQkFBcUI7QUFDckIsTUFBTTtBQUNOLCtEQUErRDtBQUMvRCxxQkFBcUI7QUFDckIsTUFBTTtBQUNOLGdFQUFnRTtBQUNoRSxxQkFBcUI7QUFDckIsTUFBTTtBQUNOLCtEQUErRDtBQUMvRCxxQkFBcUI7QUFDckIsTUFBTSJ9