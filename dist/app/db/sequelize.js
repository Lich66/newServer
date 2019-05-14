"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const sequelize_typescript_1 = require("sequelize-typescript");
exports.sequelize = new sequelize_typescript_1.Sequelize({
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
    modelPaths: [path.resolve(__dirname, '..', 'models')],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VxdWVsaXplLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL2RiL3NlcXVlbGl6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUM3QiwrREFBaUQ7QUFFcEMsUUFBQSxTQUFTLEdBQUcsSUFBSSxnQ0FBUyxDQUFDO0lBQ25DLGdCQUFnQixFQUFFLElBQUk7SUFDdEIsSUFBSSxFQUFFLGNBQWM7SUFDcEIsSUFBSSxFQUFFLElBQUk7SUFDVixRQUFRLEVBQUUsU0FBUztJQUNuQixPQUFPLEVBQUUsT0FBTztJQUNoQixRQUFRLEVBQUUsTUFBTTtJQUNoQixRQUFRLEVBQUUsUUFBUTtJQUNsQix1QkFBdUI7SUFDdkIsWUFBWTtJQUNaLGtFQUFrRTtJQUNsRSwrQkFBK0I7SUFDL0IsZ0NBQWdDO0lBQ2hDLHVCQUF1QjtJQUN2QixtREFBbUQ7SUFDbkQsS0FBSztJQUNMLElBQUksRUFBRTtRQUNGLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLENBQUM7UUFDTixPQUFPLEVBQUUsS0FBSztRQUNkLElBQUksRUFBRSxLQUFLO0tBQ2Q7SUFDRCxRQUFRLEVBQUUsUUFBUTtJQUNsQixVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7Q0FDeEQsQ0FBQyxDQUFDIn0=