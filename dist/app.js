"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pinus_1 = require("pinus");
const preload_1 = require("./preload");
const sequelize_1 = require("./app/db/sequelize");
// 同步到数据库 别乱用   这就是从删库到跑路的第一步
// sequelize.sync({ force: true });
sequelize_1.sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
/**
 *  替换全局Promise
 *  自动解析sourcemap
 *  捕获全局错误
 */
preload_1.preload();
/**
 * Init app for client.
 */
let app = pinus_1.pinus.createApp();
app.set('name', 'magnate-server');
// app configuration
app.configure('production|development', 'connector', function () {
    app.set('connectorConfig', {
        connector: pinus_1.pinus.connectors.hybridconnector,
        heartbeat: 3
        // useDict: true,
        // useProtobuf: true
    });
});
app.configure('production|development', 'gate', function () {
    app.set('connectorConfig', {
        connector: pinus_1.pinus.connectors.hybridconnector
        // useProtobuf: true
    });
});
// app.configure('production|development', "hall|user|connector|room|club|gate", function () {
//   var redisClient = require("redis").createClient(6379, "192.168.1.21");
//   app.set("redisClient", redisClient);
// })
// start app
app.start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQThCO0FBQzlCLHVDQUFvQztBQUVwQyxrREFBK0M7QUFFL0MsNkJBQTZCO0FBQzdCLG1DQUFtQztBQUVuQyxxQkFBUztLQUNOLFlBQVksRUFBRTtLQUNkLElBQUksQ0FBQyxHQUFHLEVBQUU7SUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLCtDQUErQyxDQUFDLENBQUM7QUFDL0QsQ0FBQyxDQUFDO0tBQ0QsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzNELENBQUMsQ0FBQyxDQUFDO0FBQ0w7Ozs7R0FJRztBQUNILGlCQUFPLEVBQUUsQ0FBQztBQUVWOztHQUVHO0FBQ0gsSUFBSSxHQUFHLEdBQUcsYUFBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQzVCLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFFbEMsb0JBQW9CO0FBQ3BCLEdBQUcsQ0FBQyxTQUFTLENBQUMsd0JBQXdCLEVBQUUsV0FBVyxFQUFFO0lBQ25ELEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQ3ZCO1FBQ0UsU0FBUyxFQUFFLGFBQUssQ0FBQyxVQUFVLENBQUMsZUFBZTtRQUMzQyxTQUFTLEVBQUUsQ0FBQztRQUNaLGlCQUFpQjtRQUNqQixvQkFBb0I7S0FDckIsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDSCxHQUFHLENBQUMsU0FBUyxDQUFDLHdCQUF3QixFQUFFLE1BQU0sRUFBRTtJQUM5QyxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUN2QjtRQUNFLFNBQVMsRUFBRSxhQUFLLENBQUMsVUFBVSxDQUFDLGVBQWU7UUFDM0Msb0JBQW9CO0tBQ3JCLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FBRUgsOEZBQThGO0FBQzlGLDJFQUEyRTtBQUMzRSx5Q0FBeUM7QUFDekMsS0FBSztBQUVMLFlBQVk7QUFDWixHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMifQ==