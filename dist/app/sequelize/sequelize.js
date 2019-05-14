"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const sequelize_typescript_1 = require("sequelize-typescript");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    operatorsAliases: true,
    host: '192.168.1.21',
    port: 3357,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VxdWVsaXplLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL3NlcXVlbGl6ZS9zZXF1ZWxpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBNkI7QUFDN0IsK0RBQWlEO0FBRXBDLFFBQUEsU0FBUyxHQUFHLElBQUksZ0NBQVMsQ0FBQztJQUNuQyxnQkFBZ0IsRUFBRSxJQUFJO0lBQ3RCLElBQUksRUFBRSxjQUFjO0lBQ3BCLElBQUksRUFBRSxJQUFJO0lBQ1YsUUFBUSxFQUFFLFNBQVM7SUFDbkIsT0FBTyxFQUFFLE9BQU87SUFDaEIsUUFBUSxFQUFFLE1BQU07SUFDaEIsUUFBUSxFQUFFLFFBQVE7SUFDbEIsdUJBQXVCO0lBQ3ZCLFlBQVk7SUFDWixrRUFBa0U7SUFDbEUsK0JBQStCO0lBQy9CLGdDQUFnQztJQUNoQyx1QkFBdUI7SUFDdkIsbURBQW1EO0lBQ25ELEtBQUs7SUFDTCxJQUFJLEVBQUU7UUFDRixHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxDQUFDO1FBQ04sT0FBTyxFQUFFLEtBQUs7UUFDZCxJQUFJLEVBQUUsS0FBSztLQUNkO0lBQ0QsUUFBUSxFQUFFLFFBQVE7SUFDbEIsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0NBQ3hELENBQUMsQ0FBQyJ9