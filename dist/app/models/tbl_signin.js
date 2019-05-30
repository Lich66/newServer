"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const STRING512 = 512;
let tbl_signin = 
// tslint:disable-next-line: class-name
class tbl_signin extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column({
        comment: '玩家id'
    }),
    __metadata("design:type", Number)
], tbl_signin.prototype, "userid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.BIGINT('15'),
        comment: '签到时间戳'
    }),
    __metadata("design:type", Number)
], tbl_signin.prototype, "date", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING512),
        comment: '签到表'
    }),
    __metadata("design:type", String)
], tbl_signin.prototype, "form", void 0);
tbl_signin = __decorate([
    sequelize_typescript_1.Table({ timestamps: false })
    // tslint:disable-next-line: class-name
], tbl_signin);
exports.tbl_signin = tbl_signin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX3NpZ25pbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvdGJsX3NpZ25pbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLCtEQUFtRjtBQUVuRixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUM7QUFLdEIsSUFBYSxVQUFVO0FBRHZCLHVDQUF1QztBQUN2QyxNQUFhLFVBQVcsU0FBUSw0QkFBaUI7Q0FtQmhELENBQUE7QUFkRztJQUpDLGlDQUFVO0lBQ1YsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7OzBDQUNvQjtBQU10QjtJQUpDLDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQzNCLE9BQU8sRUFBRSxPQUFPO0tBQ25CLENBQUM7O3dDQUNrQjtBQU1wQjtJQUpDLDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ2hDLE9BQU8sRUFBRSxLQUFLO0tBQ2pCLENBQUM7O3dDQUNrQjtBQWpCWCxVQUFVO0lBRnRCLDRCQUFLLENBQUMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDN0IsdUNBQXVDO0dBQzFCLFVBQVUsQ0FtQnRCO0FBbkJZLGdDQUFVIn0=