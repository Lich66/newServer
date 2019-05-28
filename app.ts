import { pinus } from 'pinus';
import { createGlobalChannelStatusPlugin } from 'pinus-global-channel-status';
import { sequelize } from './app/db/sequelize';
import { appKeyPrefix } from './app/gameConfig/nameSpace';
import { baseInit } from './app/util/memoryInit';
import * as  routeUtil from './app/util/routeUtil';
import { preload } from './preload';


// 同步到数据库 别乱用   这就是从删库到跑路的第一步
// sequelize.sync({ force: true });

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

(async () => {
  baseInit();
})();


/**
 *  替换全局Promise
 *  自动解析sourcemap
 *  捕获全局错误
 */
preload();

/**
 * Init app for client.
 */
let app = pinus.createApp();
app.set('name', 'magnate-server');

let roomList = {};
app.set('roomList', roomList);

// app configuration
app.configure('production|development', 'connector', function () {
  app.set('connectorConfig',
    {
      connector: pinus.connectors.hybridconnector,
      heartbeat: 3
      // useDict: true,
      // useProtobuf: true
    });
});
app.configure('production|development', 'gate', function () {
  app.set('connectorConfig',
    {
      connector: pinus.connectors.hybridconnector
      // useProtobuf: true
    });
});

app.configure('production|development', 'connector|user|hall|club|clubRoom|room', function () {
  app.use(createGlobalChannelStatusPlugin(), {
    family: 4,           // 4 (IPv4) or 6 (IPv6)
    options: {},
    host: '192.168.1.21',
    password: '123456',
    port: 6379,
    db: 10,      // optinal, from 0 to 15 with default redis configure
    // optional
    cleanOnStartUp: app.getServerType() == 'connector'
  });
});

app.configure('production|development', function () {
  // route configures
  // app.route('hall', routeUtil.hall);
  app.route('club', routeUtil.club);
  // app.route('clubRoom', routeUtil.clubRoom);
  app.route('room', routeUtil.room);
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

process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});
