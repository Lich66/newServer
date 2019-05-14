"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = require("bluebird");
const redis = require("redis");
;
exports.redisClient = redis.createClient(6379, '192.168.1.21');
bluebird_1.promisifyAll(redis);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkaXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvZGIvcmVkaXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBd0M7QUFDeEMsK0JBQStCO0FBSTlCLENBQUM7QUFFVyxRQUFBLFdBQVcsR0FBb0IsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDckYsdUJBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyJ9