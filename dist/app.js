"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pinus_1 = require("pinus");
const pinus_global_channel_status_1 = require("pinus-global-channel-status");
const sequelize_1 = require("./app/db/sequelize");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQThCO0FBQzlCLDZFQUE4RTtBQUM5RSxrREFBK0M7QUFFL0Msc0RBQWlEO0FBQ2pELGtEQUFtRDtBQUNuRCx1Q0FBb0M7QUFHcEMsNkJBQTZCO0FBQzdCLG1DQUFtQztBQUVuQyxxQkFBUztLQUNOLFlBQVksRUFBRTtLQUNkLElBQUksQ0FBQyxHQUFHLEVBQUU7SUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLCtDQUErQyxDQUFDLENBQUM7QUFDL0QsQ0FBQyxDQUFDO0tBQ0QsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzNELENBQUMsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxLQUFLLElBQUksRUFBRTtJQUNWLHFCQUFRLEVBQUUsQ0FBQztBQUNiLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFHTDs7OztHQUlHO0FBQ0gsaUJBQU8sRUFBRSxDQUFDO0FBRVY7O0dBRUc7QUFDSCxJQUFJLEdBQUcsR0FBRyxhQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDNUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUVsQyxvQkFBb0I7QUFDcEIsR0FBRyxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsRUFBRSxXQUFXLEVBQUU7SUFDbkQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFDdkI7UUFDRSxTQUFTLEVBQUUsYUFBSyxDQUFDLFVBQVUsQ0FBQyxlQUFlO1FBQzNDLFNBQVMsRUFBRSxDQUFDO1FBQ1osaUJBQWlCO1FBQ2pCLG9CQUFvQjtLQUNyQixDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQztBQUNILEdBQUcsQ0FBQyxTQUFTLENBQUMsd0JBQXdCLEVBQUUsTUFBTSxFQUFFO0lBQzlDLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQ3ZCO1FBQ0UsU0FBUyxFQUFFLGFBQUssQ0FBQyxVQUFVLENBQUMsZUFBZTtRQUMzQyxvQkFBb0I7S0FDckIsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsU0FBUyxDQUFDLHdCQUF3QixFQUFFLHdDQUF3QyxFQUFFO0lBQ2hGLEdBQUcsQ0FBQyxHQUFHLENBQUMsNkRBQStCLEVBQUUsRUFBRTtRQUN6QyxNQUFNLEVBQUUsQ0FBQztRQUNULE9BQU8sRUFBRSxFQUFFO1FBQ1gsSUFBSSxFQUFFLGNBQWM7UUFDcEIsUUFBUSxFQUFFLFFBQVE7UUFDbEIsSUFBSSxFQUFFLElBQUk7UUFDVixFQUFFLEVBQUUsRUFBRTtRQUNOLFdBQVc7UUFDWCxjQUFjLEVBQUUsR0FBRyxDQUFDLGFBQWEsRUFBRSxJQUFJLFdBQVc7S0FDbkQsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsU0FBUyxDQUFDLHdCQUF3QixFQUFFO0lBQ3RDLG1CQUFtQjtJQUNuQixxQ0FBcUM7SUFDckMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLDZDQUE2QztJQUM3QyxxQ0FBcUM7SUFDckMscUNBQXFDO0lBQ3JDLHVCQUF1QjtJQUN2QiwyQ0FBMkM7QUFDN0MsQ0FBQyxDQUFDLENBQUM7QUFFSCxZQUFZO0FBQ1osR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ1oscUJBQXFCO0FBQ3JCLG9EQUFvRDtBQUNwRCw4Q0FBOEM7QUFDOUMsWUFBWSJ9