import { pinus } from 'pinus';
import { preload } from './preload';


// 暂时长连接

import { Sequelize } from 'sequelize-typescript';

new Sequelize({
    operatorsAliases: true,
    host: '192.168.1.21',
    port: 3356,
    database: 'magnate_db',
    dialect: 'mysql',
    username: 'root',
    password: '123456',
    // storage: ':memory:',
    define: {
        // timestamps: true, // 开启时间戳 create_at delete_at update_at
        paranoid: true, // 开启假删除
        underscored: true, // 下划线
        charset: 'utf8',
        freezeTableName: true, // 固定表名为单数  默认表名是xxxs
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    timezone: '+08:00', // 更改为北京时区
    modelPaths: [__dirname + '/app/models'],
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

