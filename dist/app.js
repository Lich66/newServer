"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pinus_1 = require("pinus");
const pinus_global_channel_status_1 = require("pinus-global-channel-status");
const sequelize_1 = require("./app/db/sequelize");
const nameSpace_1 = require("./app/gameConfig/nameSpace");
const memoryInit_1 = require("./app/util/memoryInit");
const routeUtil = require("./app/util/routeUtil");
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
let roomList = {};
app.set(nameSpace_1.appKeyPrefix.roomList, roomList);
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
app.configure('production|development', 'connector|user|hall|club|clubRoom|room', function () {
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
app.configure('production|development', function () {
    // route configures
    // app.route('hall', routeUtil.hall);
    app.route('club', routeUtil.club);
    // app.route('clubRoom', routeUtil.clubRoom);
    // app.route('room', routeUtil.room);
    // app.route('user', routeUtil.user);
    // // filter configures
    // app.filter(new pinus.filters.timeout());
});
// start app
app.start();
// setTimeout(() => {
//   let clubServers = app.getServersByType('club');
//   console.log(JSON.stringify(clubServers));
// }, 10000)
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQThCO0FBQzlCLDZFQUE4RTtBQUM5RSxrREFBK0M7QUFDL0MsMERBQTBEO0FBQzFELHNEQUFpRDtBQUNqRCxrREFBbUQ7QUFDbkQsdUNBQW9DO0FBR3BDLDZCQUE2QjtBQUM3QixtQ0FBbUM7QUFFbkMscUJBQVM7S0FDTixZQUFZLEVBQUU7S0FDZCxJQUFJLENBQUMsR0FBRyxFQUFFO0lBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO0FBQy9ELENBQUMsQ0FBQztLQUNELEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUMzRCxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsS0FBSyxJQUFJLEVBQUU7SUFDVixxQkFBUSxFQUFFLENBQUM7QUFDYixDQUFDLENBQUMsRUFBRSxDQUFDO0FBR0w7Ozs7R0FJRztBQUNILGlCQUFPLEVBQUUsQ0FBQztBQUVWOztHQUVHO0FBQ0gsSUFBSSxHQUFHLEdBQUcsYUFBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQzVCLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFFbEMsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLEdBQUcsQ0FBQyxHQUFHLENBQUMsd0JBQVksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFFekMsb0JBQW9CO0FBQ3BCLEdBQUcsQ0FBQyxTQUFTLENBQUMsd0JBQXdCLEVBQUUsV0FBVyxFQUFFO0lBQ25ELEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQ3ZCO1FBQ0UsU0FBUyxFQUFFLGFBQUssQ0FBQyxVQUFVLENBQUMsZUFBZTtRQUMzQyxTQUFTLEVBQUUsQ0FBQztRQUNaLGlCQUFpQjtRQUNqQixvQkFBb0I7S0FDckIsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDSCxHQUFHLENBQUMsU0FBUyxDQUFDLHdCQUF3QixFQUFFLE1BQU0sRUFBRTtJQUM5QyxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUN2QjtRQUNFLFNBQVMsRUFBRSxhQUFLLENBQUMsVUFBVSxDQUFDLGVBQWU7UUFDM0Msb0JBQW9CO0tBQ3JCLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsRUFBRSx3Q0FBd0MsRUFBRTtJQUNoRixHQUFHLENBQUMsR0FBRyxDQUFDLDZEQUErQixFQUFFLEVBQUU7UUFDekMsTUFBTSxFQUFFLENBQUM7UUFDVCxPQUFPLEVBQUUsRUFBRTtRQUNYLElBQUksRUFBRSxjQUFjO1FBQ3BCLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLElBQUksRUFBRSxJQUFJO1FBQ1YsRUFBRSxFQUFFLEVBQUU7UUFDTixXQUFXO1FBQ1gsY0FBYyxFQUFFLEdBQUcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxXQUFXO0tBQ25ELENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsRUFBRTtJQUN0QyxtQkFBbUI7SUFDbkIscUNBQXFDO0lBQ3JDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyw2Q0FBNkM7SUFDN0MscUNBQXFDO0lBQ3JDLHFDQUFxQztJQUNyQyx1QkFBdUI7SUFDdkIsMkNBQTJDO0FBQzdDLENBQUMsQ0FBQyxDQUFDO0FBRUgsWUFBWTtBQUNaLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNaLHFCQUFxQjtBQUNyQixvREFBb0Q7QUFDcEQsOENBQThDO0FBQzlDLFlBQVkifQ==