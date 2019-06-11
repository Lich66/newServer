"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dispatcher_1 = require("./dispatcher");
function hall(session, msg, app, cb) {
    let hallServers = app.getServersByType('hall');
    if (!hallServers || hallServers.length === 0) {
        cb(new Error('can not find hall servers.'));
        return;
    }
    let res = dispatcher_1.dispatch(Math.random().toString(), hallServers);
    cb(null, res.id);
}
exports.hall = hall;
function club(session, msg, app, cb) {
    let clubServers = app.getServersByType('club');
    if (!clubServers || clubServers.length === 0) {
        cb(new Error('can not find club servers.'));
        return;
    }
    let res = dispatcher_1.dispatch(Math.random().toString(), clubServers);
    cb(null, res.id);
}
exports.club = club;
function clubRoom(session, msg, app, cb) {
    let clubRoomServers = app.getServersByType('clubRoom');
    if (!clubRoomServers || clubRoomServers.length === 0) {
        cb(new Error('can not find clubRoom servers.'));
        return;
    }
    let res = dispatcher_1.dispatch(Math.random().toString(), clubRoomServers);
    console.log('clubRoomclubRoomclubRoomclubRoomclubRoomclubRoomclubRoomclubRoomclubRoomclubRoom');
    console.log(msg.body);
    if (msg.body && msg.body.sid) {
        res.id = msg.body.sid;
    }
    cb(null, res.id);
}
exports.clubRoom = clubRoom;
function room(session, msg, app, cb) {
    console.log('房间route转向: ' + JSON.stringify(msg));
    let roomServers = app.getServersByType('room');
    if (!roomServers || roomServers.length === 0) {
        cb(new Error('can not find room servers.'));
        return;
    }
    let res = dispatcher_1.dispatch(Math.random().toString(), roomServers);
    // if (msg.body && msg.body.sid) {
    //     res.id = msg.body.sid;
    // }
    res.id = 'room-server-1';
    cb(null, res.id);
}
exports.room = room;
function user(session, msg, app, cb) {
    let userServers = app.getServersByType('room');
    if (!userServers || userServers.length === 0) {
        cb(new Error('can not user room servers.'));
        return;
    }
    let res = dispatcher_1.dispatch(Math.random().toString(), userServers);
    cb(null, res.id);
}
exports.user = user;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVVdGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL3V0aWwvcm91dGVVdGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsNkNBQXdDO0FBR3hDLFNBQWdCLElBQUksQ0FBQyxPQUFnQixFQUFFLEdBQVEsRUFBRSxHQUFnQixFQUFFLEVBQTJDO0lBQzFHLElBQUksV0FBVyxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUUvQyxJQUFJLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQzFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7UUFDNUMsT0FBTztLQUNWO0lBRUQsSUFBSSxHQUFHLEdBQUcscUJBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFFMUQsRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckIsQ0FBQztBQVhELG9CQVdDO0FBRUQsU0FBZ0IsSUFBSSxDQUFDLE9BQWdCLEVBQUUsR0FBUSxFQUFFLEdBQWdCLEVBQUUsRUFBMkM7SUFDMUcsSUFBSSxXQUFXLEdBQUcsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRS9DLElBQUksQ0FBQyxXQUFXLElBQUksV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDMUMsRUFBRSxDQUFDLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQztRQUM1QyxPQUFPO0tBQ1Y7SUFDRCxJQUFJLEdBQUcsR0FBRyxxQkFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUMxRCxFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxF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