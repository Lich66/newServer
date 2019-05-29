"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../db/redis");
let room = {
    roomid: '123456',
    userList: ['123', '456']
};
redis_1.redisClient.setAsync('room:123456', JSON.stringify(room));
// let room1 = new RoomChannelService();
redis_1.redisClient.getAsync('room:123456').then((xx) => {
    {
        console.log(JSON.parse(xx));
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdFJlZGlzSkcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvdGVzdC90ZXN0UmVkaXNKRy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHVDQUEwQztBQUUxQyxJQUFJLElBQUksR0FBRztJQUNQLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7Q0FDM0IsQ0FBQztBQUdGLG1CQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFFMUQsd0NBQXdDO0FBRXZDLG1CQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO0lBQzdDO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FFL0I7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9