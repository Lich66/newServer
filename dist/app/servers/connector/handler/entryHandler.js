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
function default_1(app) {
    return new Handler(app);
}
exports.default = default_1;
class Handler {
    constructor(app) {
        this.app = app;
    }
    /**
     * New client entry.
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     * @param  {Function} next    next step callback
     * @return {Void}
     */
    entry(msg, session) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(msg);
            return { code: 200, msg: 'game server is ok.' };
        });
    }
    /**
     * Publish route for mqtt connector.
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     * @param  {Function} next    next step callback
     * @return {Void}
     */
    publish(msg, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = {
                topic: 'publish',
                payload: JSON.stringify({ code: 200, msg: 'publish message is ok.' })
            };
            return result;
        });
    }
    /**
     * Subscribe route for mqtt connector.
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     * @param  {Function} next    next step callback
     * @return {Void}
     */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnlIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vYXBwL3NlcnZlcnMvY29ubmVjdG9yL2hhbmRsZXIvZW50cnlIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSxtQkFBeUIsR0FBZ0I7SUFDckMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRkQsNEJBRUM7QUFFRDtJQUNJLFlBQW9CLEdBQWdCO1FBQWhCLFFBQUcsR0FBSCxHQUFHLENBQWE7SUFFcEMsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDRyxLQUFLLENBQUMsR0FBUSxFQUFFLE9BQXdCOztZQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxDQUFDO1FBQ3BELENBQUM7S0FBQTtJQUVEOzs7Ozs7O09BT0c7SUFDRyxPQUFPLENBQUMsR0FBUSxFQUFFLE9BQXdCOztZQUM1QyxJQUFJLE1BQU0sR0FBRztnQkFDVCxLQUFLLEVBQUUsU0FBUztnQkFDaEIsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSx3QkFBd0IsRUFBRSxDQUFDO2FBQ3hFLENBQUM7WUFDRixPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO0tBQUE7SUFFRDs7Ozs7OztPQU9HO0lBQ0csU0FBUyxDQUFDLEdBQVEsRUFBRSxPQUF3Qjs7WUFDOUMsSUFBSSxNQUFNLEdBQUc7Z0JBQ1QsS0FBSyxFQUFFLFdBQVc7Z0JBQ2xCLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsMEJBQTBCLEVBQUUsQ0FBQzthQUMxRSxDQUFDO1lBQ0YsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztLQUFBO0NBRUo7QUFsREQsMEJBa0RDIn0=