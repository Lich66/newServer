"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dispatcher_1 = require("./dispatcher");
function chat(session, msg, app, cb) {
    let chatServers = app.getServersByType('chat');
    if (!chatServers || chatServers.length === 0) {
        cb(new Error('can not find chat servers.'));
        return;
    }
    let res = dispatcher_1.dispatch(session.get('rid'), chatServers);
    cb(null, res.id);
}
exports.chat = chat;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVVdGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL3V0aWwvcm91dGVVdGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsNkNBQXdDO0FBR3hDLFNBQWdCLElBQUksQ0FBQyxPQUFnQixFQUFFLEdBQVEsRUFBRSxHQUFnQixFQUFFLEVBQTJDO0lBQzFHLElBQUksV0FBVyxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUUvQyxJQUFJLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQzFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7UUFDNUMsT0FBTztLQUNWO0lBRUQsSUFBSSxHQUFHLEdBQUcscUJBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBRXBELEVBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3JCLENBQUM7QUFYRCxvQkFXQyJ9