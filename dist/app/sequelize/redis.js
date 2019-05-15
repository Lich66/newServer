"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = require("bluebird");
const redis = require("redis");
;
exports.redisClient = redis.createClient(6379, '192.168.1.21');
bluebird_1.promisifyAll(redis);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkaXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvc2VxdWVsaXplL3JlZGlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXdDO0FBQ3hDLCtCQUErQjtBQUk5QixDQUFDO0FBRVcsUUFBQSxXQUFXLEdBQW9CLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQ3JGLHVCQUFZLENBQUMsS0FBSyxDQUFDLENBQUMifQ==