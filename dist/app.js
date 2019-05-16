"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pinus_1 = require("pinus");
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("./app/db/sequelize");
const memoryInit_1 = require("./app/util/memoryInit");
const preload_1 = require("./preload");
const Op = sequelize_typescript_1.Sequelize.Op;
// 同步到数据库 别乱用   这就是从删库到跑路的第一步
// sequelize.sync({ force: true });
sequelize_1.sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
(() => __awaiter(this, void 0, void 0, function* () {
    memoryInit_1.baseInit();
}))();
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
        heartbeat: 3
        // useDict: true,
        // useProtobuf: true
    });
});
app.configure('production|development', 'gate', function () {
    app.set('connectorConfig', {
        connector: pinus_1.pinus.connectors.hybridconnector
        // useProtobuf: true
    });
});
// app.configure('production|development', "hall|user|connector|room|club|gate", function () {
//   var redisClient = require("redis").createClient(6379, "192.168.1.21");
//   app.set("redisClient", redisClient);
// })
// start app
app.start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxpQ0FBOEI7QUFDOUIsK0RBQWlEO0FBQ2pELGtEQUErQztBQUMvQyxzREFBaUQ7QUFDakQsdUNBQW9DO0FBR3BDLE1BQU0sRUFBRSxHQUFHLGdDQUFTLENBQUMsRUFBRSxDQUFDO0FBQ3hCLDZCQUE2QjtBQUM3QixtQ0FBbUM7QUFFbkMscUJBQVM7S0FDTixZQUFZLEVBQUU7S0FDZCxJQUFJLENBQUMsR0FBRyxFQUFFO0lBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO0FBQy9ELENBQUMsQ0FBQztLQUNELEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUMzRCxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsR0FBUyxFQUFFO0lBQ1YscUJBQVEsRUFBRSxDQUFDO0FBQ2IsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDO0FBR0w7Ozs7R0FJRztBQUNILGlCQUFPLEVBQUUsQ0FBQztBQUVWOztHQUVHO0FBQ0gsSUFBSSxHQUFHLEdBQUcsYUFBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQzVCLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFFbEMsb0JBQW9CO0FBQ3BCLEdBQUcsQ0FBQyxTQUFTLENBQUMsd0JBQXdCLEVBQUUsV0FBVyxFQUFFO0lBQ25ELEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQ3ZCO1FBQ0UsU0FBUyxFQUFFLGFBQUssQ0FBQyxVQUFVLENBQUMsZUFBZTtRQUMzQyxTQUFTLEVBQUUsQ0FBQztRQUNaLGlCQUFpQjtRQUNqQixvQkFBb0I7S0FDckIsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDSCxHQUFHLENBQUMsU0FBUyxDQUFDLHdCQUF3QixFQUFFLE1BQU0sRUFBRTtJQUM5QyxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUN2QjtRQUNFLFNBQVMsRUFBRSxhQUFLLENBQUMsVUFBVSxDQUFDLGVBQWU7UUFDM0Msb0JBQW9CO0tBQ3JCLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FBRUgsOEZBQThGO0FBQzlGLDJFQUEyRTtBQUMzRSx5Q0FBeUM7QUFDekMsS0FBSztBQUVMLFlBQVk7QUFDWixHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMifQ==