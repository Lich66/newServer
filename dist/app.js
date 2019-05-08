"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pinus_1 = require("pinus");
const preload_1 = require("./preload");
// 暂时长连接
const sequelize_typescript_1 = require("sequelize-typescript");
new sequelize_typescript_1.Sequelize({
    operatorsAliases: true,
    host: '192.168.1.21',
    port: 3356,
    database: 'chessdb',
    dialect: 'mysql',
    username: 'root',
    password: '123456',
    // storage: ':memory:',
    // define: {
    //     // timestamps: true, // 开启时间戳 create_at delete_at update_at
    //     paranoid: true, // 开启假删除
    //     underscored: true, // 下划线
    //     charset: 'utf8',
    //     freezeTableName: true, // 固定表名为单数  默认表名是xxxs
    // },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    timezone: '+08:00',
    modelPaths: [__dirname + '/app/models'],
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
        heartbeat: 3,
    });
});
app.configure('production|development', 'gate', function () {
    app.set('connectorConfig', {
        connector: pinus_1.pinus.connectors.hybridconnector,
    });
});
// start app
app.start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQThCO0FBQzlCLHVDQUFvQztBQUdwQyxRQUFRO0FBRVIsK0RBQWlEO0FBRWpELElBQUksZ0NBQVMsQ0FBQztJQUNWLGdCQUFnQixFQUFFLElBQUk7SUFDdEIsSUFBSSxFQUFFLGNBQWM7SUFDcEIsSUFBSSxFQUFFLElBQUk7SUFDVixRQUFRLEVBQUUsU0FBUztJQUNuQixPQUFPLEVBQUUsT0FBTztJQUNoQixRQUFRLEVBQUUsTUFBTTtJQUNoQixRQUFRLEVBQUUsUUFBUTtJQUNsQix1QkFBdUI7SUFDdkIsWUFBWTtJQUNaLGtFQUFrRTtJQUNsRSwrQkFBK0I7SUFDL0IsZ0NBQWdDO0lBQ2hDLHVCQUF1QjtJQUN2QixtREFBbUQ7SUFDbkQsS0FBSztJQUNMLElBQUksRUFBRTtRQUNGLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLENBQUM7UUFDTixPQUFPLEVBQUUsS0FBSztRQUNkLElBQUksRUFBRSxLQUFLO0tBQ2Q7SUFDRCxRQUFRLEVBQUUsUUFBUTtJQUNsQixVQUFVLEVBQUUsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO0NBQzFDLENBQUMsQ0FBQztBQUNIOzs7O0dBSUc7QUFDSCxpQkFBTyxFQUFFLENBQUM7QUFFVjs7R0FFRztBQUNILElBQUksR0FBRyxHQUFHLGFBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUM1QixHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBRWxDLG9CQUFvQjtBQUNwQixHQUFHLENBQUMsU0FBUyxDQUFDLHdCQUF3QixFQUFFLFdBQVcsRUFBRTtJQUNqRCxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUNyQjtRQUNJLFNBQVMsRUFBRSxhQUFLLENBQUMsVUFBVSxDQUFDLGVBQWU7UUFDM0MsU0FBUyxFQUFFLENBQUM7S0FHZixDQUFDLENBQUM7QUFDWCxDQUFDLENBQUMsQ0FBQztBQUNILEdBQUcsQ0FBQyxTQUFTLENBQUMsd0JBQXdCLEVBQUUsTUFBTSxFQUFFO0lBQzVDLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQ3JCO1FBQ0ksU0FBUyxFQUFFLGFBQUssQ0FBQyxVQUFVLENBQUMsZUFBZTtLQUU5QyxDQUFDLENBQUM7QUFDWCxDQUFDLENBQUMsQ0FBQztBQUVILFlBQVk7QUFDWixHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMifQ==