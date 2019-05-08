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
const tbl_user_1 = require("../../models/tbl_user");
class Login {
    static login(json) {
        return __awaiter(this, void 0, void 0, function* () {
            // 因为表中没有id
            yield tbl_user_1.tbl_user.removeAttribute('id');
            const userone = yield tbl_user_1.tbl_user.findOrCreate({ where: json, defaults: json });
            if (userone === null) {
                return null;
            }
            else {
                return userone;
            }
        });
    }
}
exports.Login = Login;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci91c2VyL2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxvREFBaUQ7QUFDakQ7SUFDVyxNQUFNLENBQU8sS0FBSyxDQUFDLElBQWU7O1lBQ3JDLFdBQVc7WUFDWCxNQUFNLG1CQUFRLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sT0FBTyxHQUF3QixNQUFNLG1CQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNsRyxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7Z0JBQ2xCLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7aUJBQU07Z0JBQ0gsT0FBTyxPQUFPLENBQUM7YUFDbEI7UUFDTCxDQUFDO0tBQUE7Q0FDSjtBQVhELHNCQVdDIn0=