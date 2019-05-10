import { pinus } from 'pinus';
import { preload } from './preload';

import { sequelize } from './app/sequelize/sequelize'

sequelize.sync({ force: true });
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

