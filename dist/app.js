"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pinus_1 = require("pinus");
const pinus_global_channel_status_1 = require("pinus-global-channel-status");
const sequelize_1 = require("./app/db/sequelize");
const memoryInit_1 = require("./app/util/memoryInit");
const preload_1 = require("./preload");
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
(async () => {
    memoryInit_1.baseInit();
})();
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
    app.use(pinus_global_channel_status_1.createGlobalChannelStatusPlugin(), {
        family: 4,
        options: {},
        host: '192.168.1.21',
        password: '123456',
        port: 6379,
        db: 10,
        // optional
        cleanOnStartUp: app.getServerType() == 'connector'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQThCO0FBQzlCLDZFQUE4RTtBQUM5RSxrREFBK0M7QUFDL0Msc0RBQWlEO0FBQ2pELHVDQUFvQztBQUdwQyw2QkFBNkI7QUFDN0IsbUNBQW1DO0FBRW5DLHFCQUFTO0tBQ04sWUFBWSxFQUFFO0tBQ2QsSUFBSSxDQUFDLEdBQUcsRUFBRTtJQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsK0NBQStDLENBQUMsQ0FBQztBQUMvRCxDQUFDLENBQUM7S0FDRCxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0NBQW9DLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDM0QsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLEtBQUssSUFBSSxFQUFFO0lBQ1YscUJBQVEsRUFBRSxDQUFDO0FBQ2IsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUdMOzs7O0dBSUc7QUFDSCxpQkFBTyxFQUFFLENBQUM7QUFFVjs7R0FFRztBQUNILElBQUksR0FBRyxHQUFHLGFBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUM1QixHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBRWxDLG9CQUFvQjtBQUNwQixHQUFHLENBQUMsU0FBUyxDQUFDLHdCQUF3QixFQUFFLFdBQVcsRUFBRTtJQUNuRCxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUN2QjtRQUNFLFNBQVMsRUFBRSxhQUFLLENBQUMsVUFBVSxDQUFDLGVBQWU7UUFDM0MsU0FBUyxFQUFFLENBQUM7UUFDWixpQkFBaUI7UUFDakIsb0JBQW9CO0tBQ3JCLENBQUMsQ0FBQztJQUNMLEdBQUcsQ0FBQyxHQUFHLENBQUMsNkRBQStCLEVBQUUsRUFBRTtRQUN6QyxNQUFNLEVBQUUsQ0FBQztRQUNULE9BQU8sRUFBRSxFQUFFO1FBQ1gsSUFBSSxFQUFFLGNBQWM7UUFDcEIsUUFBUSxFQUFFLFFBQVE7UUFDbEIsSUFBSSxFQUFFLElBQUk7UUFDVixFQUFFLEVBQUUsRUFBRTtRQUNOLFdBQVc7UUFDWCxjQUFjLEVBQUUsR0FBRyxDQUFDLGFBQWEsRUFBRSxJQUFJLFdBQVc7S0FDbkQsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDSCxHQUFHLENBQUMsU0FBUyxDQUFDLHdCQUF3QixFQUFFLE1BQU0sRUFBRTtJQUM5QyxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUN2QjtRQUNFLFNBQVMsRUFBRSxhQUFLLENBQUMsVUFBVSxDQUFDLGVBQWU7UUFDM0Msb0JBQW9CO0tBQ3JCLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FBRUgsOEZBQThGO0FBQzlGLDJFQUEyRTtBQUMzRSx5Q0FBeUM7QUFDekMsS0FBSztBQUVMLFlBQVk7QUFDWixHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMifQ==