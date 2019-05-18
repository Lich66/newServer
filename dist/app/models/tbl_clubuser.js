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
const BIGINT20 = '20';
const STRING64 = 64;
let tbl_clubuser = 
// tslint:disable-next-line: class-name
class tbl_clubuser extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.BIGINT(BIGINT20),
        comment: '主键'
    }),
    __metadata("design:type", Number)
], tbl_clubuser.prototype, "cid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '茶楼id'
    }),
    __metadata("design:type", Number)
], tbl_clubuser.prototype, "clubid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '用户id'
    }),
    __metadata("design:type", Number)
], tbl_clubuser.prototype, "userid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '角色'
    }),
    __metadata("design:type", Number)
], tbl_clubuser.prototype, "chactor", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: 'TIMESTAMP',
        comment: '加入时间'
    }),
    __metadata("design:type", Date)
], tbl_clubuser.prototype, "adtime", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING64),
        comment: '邀请人'
    }),
    __metadata("design:type", String)
], tbl_clubuser.prototype, "invitor", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '积分'
    }),
    __metadata("design:type", Number)
], tbl_clubuser.prototype, "points", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '冻结标志'
    }),
    __metadata("design:type", Boolean)
], tbl_clubuser.prototype, "freeze_flag", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '助手标志'
    }),
    __metadata("design:type", Boolean)
], tbl_clubuser.prototype, "assist_flag", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '代付标志'
    }),
    __metadata("design:type", Boolean)
], tbl_clubuser.prototype, "pay_flag", void 0);
tbl_clubuser = __decorate([
    sequelize_typescript_1.Table
    // tslint:disable-next-line: class-name
], tbl_clubuser);
exports.tbl_clubuser = tbl_clubuser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX2NsdWJ1c2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL21vZGVscy90YmxfY2x1YnVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwrREFBaUc7QUFFakcsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUdwQixJQUFhLFlBQVk7QUFEekIsdUNBQXVDO0FBQ3ZDLE1BQWEsWUFBYSxTQUFRLDRCQUFtQjtDQXlEcEQsQ0FBQTtBQWpERztJQU5DLG9DQUFhO0lBQ2IsaUNBQVU7SUFDViw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUMvQixPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDOzt5Q0FDaUI7QUFLbkI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7NENBQ29CO0FBS3RCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7OzRDQUNvQjtBQUt0QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDOzs2Q0FDcUI7QUFNdkI7SUFKQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLFdBQVc7UUFDakIsT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs4QkFDYSxJQUFJOzRDQUFDO0FBTXBCO0lBSkMsNkJBQU0sQ0FBQztRQUNKLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDL0IsT0FBTyxFQUFFLEtBQUs7S0FDakIsQ0FBQzs7NkNBQ3FCO0FBS3ZCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUM7OzRDQUNvQjtBQUt0QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOztpREFDMEI7QUFLNUI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7aURBQzBCO0FBSzVCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7OzhDQUN1QjtBQXZEaEIsWUFBWTtJQUZ4Qiw0QkFBSztJQUNOLHVDQUF1QztHQUMxQixZQUFZLENBeUR4QjtBQXpEWSxvQ0FBWSJ9