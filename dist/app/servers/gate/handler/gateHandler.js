"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dispatcher_1 = require("../../../util/dispatcher");
function default_1(app) {
    return new Handler(app);
}
exports.default = default_1;
class Handler {
    constructor(app) {
        this.app = app;
    }
    async queryEntry(request, session) {
        let connectors = this.app.getServersByType('connector');
        if (!connectors || connectors.length === 0) {
            return {
                code: 500
            };
        }
        // 这里有一段对比版本信息和入库谁被信息的代码
        // 这里写死了获取手机号 毕竟负载均衡都是假的，以后再改
        let res = dispatcher_1.dispatch(Math.random().toString(), connectors);
        return {
            code: 200,
            data: {
                host: res.host,
                port: res.clientPort
            }
        };
    }
    async publish(msg, session) {
        let result = {
            topic: 'publish',
            payload: JSON.stringify({ code: 200, msg: 'publish message is ok.' })
        };
        return result;
    }
    async subscribe(msg, session) {
        let result = {
            topic: 'subscribe',
            payload: JSON.stringify({ code: 200, msg: 'subscribe message is ok.' })
        };
        return result;
    }
}
exports.Handler = Handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F0ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy9nYXRlL2hhbmRsZXIvZ2F0ZUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSx5REFBb0Q7QUFFcEQsbUJBQXlCLEdBQWdCO0lBQ3JDLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQUZELDRCQUVDO0FBRUQsTUFBYSxPQUFPO0lBRWhCLFlBQW1CLEdBQWdCO1FBQy9CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUM7SUFFTSxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQWlCLEVBQUUsT0FBd0I7UUFFL0QsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3hDLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLEdBQUc7YUFDWixDQUFDO1NBQ0w7UUFDRCx3QkFBd0I7UUFFeEIsNkJBQTZCO1FBQzdCLElBQUksR0FBRyxHQUFHLHFCQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3pELE9BQU87WUFDSCxJQUFJLEVBQUUsR0FBRztZQUNULElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7Z0JBQ2QsSUFBSSxFQUFFLEdBQUcsQ0FBQyxVQUFVO2FBQ3ZCO1NBRUosQ0FBQztJQUNOLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQVEsRUFBRSxPQUF3QjtRQUNuRCxJQUFJLE1BQU0sR0FBRztZQUNULEtBQUssRUFBRSxTQUFTO1lBQ2hCLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsd0JBQXdCLEVBQUUsQ0FBQztTQUN4RSxDQUFDO1FBQ0YsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVNLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBUSxFQUFFLE9BQXdCO1FBQ3JELElBQUksTUFBTSxHQUFHO1lBQ1QsS0FBSyxFQUFFLFdBQVc7WUFDbEIsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSwwQkFBMEIsRUFBRSxDQUFDO1NBQzFFLENBQUM7UUFDRixPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0NBQ0o7QUEzQ0QsMEJBMkNDIn0=