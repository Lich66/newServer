"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    queryEntry(request) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    publish(msg, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = {
                topic: 'publish',
                payload: JSON.stringify({ code: 200, msg: 'publish message is ok.' })
            };
            return result;
        });
    }
    subscribe(msg, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = {
                topic: 'subscribe',
                payload: JSON.stringify({ code: 200, msg: 'subscribe message is ok.' })
            };
            return result;
        });
    }
}
exports.Handler = Handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F0ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy9nYXRlL2hhbmRsZXIvZ2F0ZUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLHlEQUFvRDtBQUVwRCxtQkFBeUIsR0FBZ0I7SUFDckMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRkQsNEJBRUM7QUFFRDtJQUVJLFlBQW1CLEdBQWdCO1FBQy9CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUM7SUFFWSxVQUFVLENBQUMsT0FBaUI7O1lBRXJDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDeEMsT0FBTztvQkFDSCxJQUFJLEVBQUUsR0FBRztpQkFDWixDQUFDO2FBQ0w7WUFDRCx3QkFBd0I7WUFFeEIsNkJBQTZCO1lBQzdCLElBQUksR0FBRyxHQUFHLHFCQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3pELE9BQU87Z0JBQ0gsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTtvQkFDZCxJQUFJLEVBQUUsR0FBRyxDQUFDLFVBQVU7aUJBQ3ZCO2FBRUosQ0FBQztRQUNOLENBQUM7S0FBQTtJQUVZLE9BQU8sQ0FBQyxHQUFRLEVBQUUsT0FBd0I7O1lBQ25ELElBQUksTUFBTSxHQUFHO2dCQUNULEtBQUssRUFBRSxTQUFTO2dCQUNoQixPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLHdCQUF3QixFQUFFLENBQUM7YUFDeEUsQ0FBQztZQUNGLE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7S0FBQTtJQUVZLFNBQVMsQ0FBQyxHQUFRLEVBQUUsT0FBd0I7O1lBQ3JELElBQUksTUFBTSxHQUFHO2dCQUNULEtBQUssRUFBRSxXQUFXO2dCQUNsQixPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLDBCQUEwQixFQUFFLENBQUM7YUFDMUUsQ0FBQztZQUNGLE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7S0FBQTtDQUNKO0FBM0NELDBCQTJDQyJ9