"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../db/redis");
redis_1.redisClient.setAsync("testtttttttt", "string val");
redis_1.redisClient.getAsync('testtttttttt').then(function (res) {
    console.log(res); // => 'bar'
});
setTimeout(() => {
    redis_1.redisClient.getAsync('testtttttttt').then(function (res) {
        console.log(res); // => 'bar'
    });
}, 5000);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdHJlZGlzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL3Rlc3QvdGVzdHJlZGlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQTBDO0FBRzFDLG1CQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUNuRCxtQkFBVyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHO0lBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXO0FBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLEdBQUcsRUFBRTtJQUNaLG1CQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUc7UUFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVc7SUFDakMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMifQ==