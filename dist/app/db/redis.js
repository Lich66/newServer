"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis = require("redis");
exports.port = 6379;
exports.reidsHost = '192.168.1.21';
exports.password = '123456';
exports.redisClient = redis.createClient(exports.port, exports.reidsHost, { password: exports.password });
// promisifyAll(redis);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkaXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvZGIvcmVkaXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwrQkFBK0I7QUFHbEIsUUFBQSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ1osUUFBQSxTQUFTLEdBQUcsY0FBYyxDQUFDO0FBQzNCLFFBQUEsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQWlQcEIsUUFBQSxXQUFXLEdBQXFCLEtBQUssQ0FBQyxZQUFZLENBQUMsWUFBSSxFQUFFLGlCQUFTLEVBQUUsRUFBRSxRQUFRLEVBQVIsZ0JBQVEsRUFBRSxDQUFDLENBQUM7QUFDL0YsdUJBQXVCIn0=