import { pinus } from 'pinus';
import { Sequelize } from 'sequelize-typescript';
import { sequelize } from './app/db/sequelize';
import { baseInit } from './app/util/memoryInit';
import { preload } from './preload';


const Op = Sequelize.Op;
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

// app.configure('production|development', "hall|user|connector|room|club|gate", function () {
//   var redisClient = require("redis").createClient(6379, "192.168.1.21");
//   app.set("redisClient", redisClient);
// })

// start app
app.start();
