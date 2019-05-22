"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = require("bluebird");
const redis = require("redis");
const port = 6379;
const reidsHost = '192.168.1.21';
exports.redisClient = redis.createClient(port, reidsHost, { password: '123456' });
bluebird_1.promisifyAll(redis);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkaXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvZGIvcmVkaXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBd0M7QUFDeEMsK0JBQStCO0FBRy9CLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztBQUNsQixNQUFNLFNBQVMsR0FBRyxjQUFjLENBQUM7QUFpUHBCLFFBQUEsV0FBVyxHQUFxQixLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUN6Ryx1QkFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDIn0=