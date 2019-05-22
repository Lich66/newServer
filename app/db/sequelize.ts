import * as path from 'path';
import { Sequelize } from 'sequelize-typescript';

export const MAXVARCHA = 188;

export const sequelize: Sequelize = new Sequelize({
    // operatorsAliases: true,
    host: '192.168.1.21',
    port: 3356,
    database: 'magnate',
    dialect: 'mysql',
    username: 'root',
    password: '123456',
    define: {
        charset: 'utf8mb4'
    },
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
    timezone: '+08:00', // 更改为北京时区
    models: [path.resolve(__dirname, '..', 'models')]
});
