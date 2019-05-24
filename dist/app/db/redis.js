"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis = require("redis");
const port = 6379;
const reidsHost = '192.168.1.21';
const password = '123456';
exports.redisClient = redis.createClient(port, reidsHost, { password });
// promisifyAll(redis);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkaXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvZGIvcmVkaXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwrQkFBK0I7QUFHL0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQztBQUNqQyxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUM7QUFpUGIsUUFBQSxXQUFXLEdBQXFCLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7QUFDL0YsdUJBQXVCIn0=