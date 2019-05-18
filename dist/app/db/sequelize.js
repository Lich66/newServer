"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const sequelize_typescript_1 = require("sequelize-typescript");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    // operatorsAliases: true,
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
        idle: 10000
    },
    timezone: '+08:00',
    models: [path.resolve(__dirname, '..', 'models')]
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VxdWVsaXplLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL2RiL3NlcXVlbGl6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUM3QiwrREFBaUQ7QUFFcEMsUUFBQSxTQUFTLEdBQWMsSUFBSSxnQ0FBUyxDQUFDO0lBQzlDLDBCQUEwQjtJQUMxQixJQUFJLEVBQUUsY0FBYztJQUNwQixJQUFJLEVBQUUsSUFBSTtJQUNWLFFBQVEsRUFBRSxTQUFTO0lBQ25CLE9BQU8sRUFBRSxPQUFPO0lBQ2hCLFFBQVEsRUFBRSxNQUFNO0lBQ2hCLFFBQVEsRUFBRSxRQUFRO0lBRWxCLHVCQUF1QjtJQUN2QixZQUFZO0lBQ1osa0VBQWtFO0lBQ2xFLCtCQUErQjtJQUMvQixnQ0FBZ0M7SUFDaEMsdUJBQXVCO0lBQ3ZCLG1EQUFtRDtJQUNuRCxLQUFLO0lBQ0wsSUFBSSxFQUFFO1FBQ0YsR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsQ0FBQztRQUNOLE9BQU8sRUFBRSxLQUFLO1FBQ2QsSUFBSSxFQUFFLEtBQUs7S0FDZDtJQUNELFFBQVEsRUFBRSxRQUFRO0lBQ2xCLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztDQUNwRCxDQUFDLENBQUMifQ==