import { pinus } from 'pinus';
import { preload } from './preload';

import { sequelize } from './app/sequelize/sequelize'

// 同步到数据库 别乱用   这就是从删库到跑路的第一步
// sequelize.sync({ force: true });

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
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
            heartbeat: 3,
            // useDict: true,
            // useProtobuf: true
        });
});
app.configure('production|development', 'gate', function () {
    app.set('connectorConfig',
        {
            connector: pinus.connectors.hybridconnector,
            // useProtobuf: true
        });
});

// start app
app.start();

