"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = require("bluebird");
const redis = require("redis");
const port = 6379;
const reidsHost = '192.168.1.21';
exports.redisClient = redis.createClient(port, reidsHost);
bluebird_1.promisifyAll(redis);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkaXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvZGIvcmVkaXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBd0M7QUFDeEMsK0JBQStCO0FBQy9CLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztBQUNsQixNQUFNLFNBQVMsR0FBRyxjQUFjLENBQUM7QUFTcEIsUUFBQSxXQUFXLEdBQXFCLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ2pGLHVCQUFZLENBQUMsS0FBSyxDQUFDLENBQUMifQ==