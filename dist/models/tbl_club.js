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
const STRING32 = 32;
const STRING2048 = 2048;
const STRING512 = 512;
let tbl_club = 
// tslint:disable-next-line: class-name
class tbl_club extends sequelize_typescript_1.Model {
    static makeUpperCase(instance) {
        // this will be called when an instance is created or updated
        instance.create_time = new Date();
    }
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AllowNull,
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.BIGINT(BIGINT20),
        comment: '茶楼id'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "clubid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '所属玩家'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "uid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING32),
        comment: '茶楼名字'
    }),
    __metadata("design:type", String)
], tbl_club.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING2048),
        comment: '茶楼公告'
    }),
    __metadata("design:type", String)
], tbl_club.prototype, "notice", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING512),
        comment: '茶楼默认玩法设置'
    }),
    __metadata("design:type", String)
], tbl_club.prototype, "play_setting", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '茶楼类型,普通还是比赛'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "type", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: 'TIMESTAMP',
        comment: '茶楼创建时间'
    }),
    __metadata("design:type", Date)
], tbl_club.prototype, "create_time", void 0);
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column({
        comment: '打烊标志'
    }),
    __metadata("design:type", Boolean)
], tbl_club.prototype, "open_flag", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '非aa支付开关'
    }),
    __metadata("design:type", Boolean)
], tbl_club.prototype, "pay_flag", void 0);
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column({
        comment: '审核开关'
    }),
    __metadata("design:type", Boolean)
], tbl_club.prototype, "audit_flag", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '积分是否可查看标识'
    }),
    __metadata("design:type", Boolean)
], tbl_club.prototype, "integral_flag", void 0);
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column({
        comment: '隐私标志'
    }),
    __metadata("design:type", Boolean)
], tbl_club.prototype, "privacy_flag", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '底分'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "end_points", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '参加分数'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "join_points", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '负分设置'
    }),
    __metadata("design:type", Boolean)
], tbl_club.prototype, "point_setflag", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '积分调整选项'
    }),
    __metadata("design:type", Boolean)
], tbl_club.prototype, "point_adjustflag", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '积分权限类型'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "point_permission", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '表情赠送对象'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "present_target", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '表情赠送次数'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "present_times", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '赠送积分'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "present_points", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tbl_club]),
    __metadata("design:returntype", void 0)
], tbl_club, "makeUpperCase", null);
tbl_club = __decorate([
    sequelize_typescript_1.Table
    // tslint:disable-next-line: class-name
], tbl_club);
exports.tbl_club = tbl_club;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX2NsdWIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9hcHAvbW9kZWxzL3RibF9jbHViLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0RBQW1JO0FBRW5JLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQztBQUN0QixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQztBQUN4QixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUM7QUFHdEIsSUFBYSxRQUFRO0FBRHJCLHVDQUF1QztBQUN2QyxNQUFhLFFBQVMsU0FBUSw0QkFBZTtJQTZDbEMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFrQjtRQUMxQyw2REFBNkQ7UUFDN0QsUUFBUSxDQUFDLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ3RDLENBQUM7Q0FzRUosQ0FBQTtBQTdHRztJQVBDLG9DQUFhO0lBQ2IsaUNBQVU7SUFDVixnQ0FBUztJQUNULDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQy9CLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7O3dDQUNvQjtBQUt0QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOztxQ0FDaUI7QUFNbkI7SUFKQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUMvQixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOztzQ0FDa0I7QUFNcEI7SUFKQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNqQyxPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzt3Q0FDb0I7QUFNdEI7SUFKQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNoQyxPQUFPLEVBQUUsVUFBVTtLQUN0QixDQUFDOzs4Q0FDMEI7QUFLNUI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLGFBQWE7S0FDekIsQ0FBQzs7c0NBQ2tCO0FBTXBCO0lBSkMsNkJBQU0sQ0FBQztRQUNKLElBQUksRUFBRSxXQUFXO1FBQ2pCLE9BQU8sRUFBRSxRQUFRO0tBQ3BCLENBQUM7OEJBQ2tCLElBQUk7NkNBQUM7QUFXekI7SUFKQyw4QkFBTyxDQUFDLEtBQUssQ0FBQztJQUNkLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzsyQ0FDd0I7QUFLMUI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLFNBQVM7S0FDckIsQ0FBQzs7MENBQ3VCO0FBTXpCO0lBSkMsOEJBQU8sQ0FBQyxLQUFLLENBQUM7SUFDZCw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7NENBQ3lCO0FBSzNCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxXQUFXO0tBQ3ZCLENBQUM7OytDQUM0QjtBQU05QjtJQUpDLDhCQUFPLENBQUMsS0FBSyxDQUFDO0lBQ2QsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7OzhDQUMyQjtBQUs3QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDOzs0Q0FDd0I7QUFLMUI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7NkNBQ3lCO0FBSzNCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7OytDQUM0QjtBQUs5QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsUUFBUTtLQUNwQixDQUFDOztrREFDK0I7QUFLakM7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLFFBQVE7S0FDcEIsQ0FBQzs7a0RBQzhCO0FBS2hDO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxRQUFRO0tBQ3BCLENBQUM7O2dEQUM0QjtBQUs5QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsUUFBUTtLQUNwQixDQUFDOzsrQ0FDMkI7QUFLN0I7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7Z0RBQzRCO0FBdkU5QjtJQURDLG1DQUFZOztxQ0FDeUIsUUFBUTs7bUNBRzdDO0FBaERRLFFBQVE7SUFGcEIsNEJBQUs7SUFDTix1Q0FBdUM7R0FDMUIsUUFBUSxDQXNIcEI7QUF0SFksNEJBQVEifQ==