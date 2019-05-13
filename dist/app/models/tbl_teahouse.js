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
let tbl_teahouse = class tbl_teahouse extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.BIGINT(20),
        comment: '茶楼id'
    }),
    __metadata("design:type", Number)
], tbl_teahouse.prototype, "houseid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(64),
        comment: '所属玩家'
    }),
    __metadata("design:type", String)
], tbl_teahouse.prototype, "uid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(32),
        comment: '茶楼名字'
    }),
    __metadata("design:type", String)
], tbl_teahouse.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(2048),
        comment: '茶楼公告'
    }),
    __metadata("design:type", Number)
], tbl_teahouse.prototype, "notice", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(512),
        comment: '茶楼默认玩法设置'
    }),
    __metadata("design:type", String)
], tbl_teahouse.prototype, "play_setting", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '茶楼类型,普通还是比赛'
    }),
    __metadata("design:type", Number)
], tbl_teahouse.prototype, "type", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '茶楼创建时间'
    }),
    __metadata("design:type", Date)
], tbl_teahouse.prototype, "create_time", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '打烊标志'
    }),
    __metadata("design:type", Boolean)
], tbl_teahouse.prototype, "open_flag", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '非aa支付开关'
    }),
    __metadata("design:type", Boolean)
], tbl_teahouse.prototype, "pay_flag", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '审核开关'
    }),
    __metadata("design:type", Boolean)
], tbl_teahouse.prototype, "audit_flag", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '积分是否可查看标识'
    }),
    __metadata("design:type", Boolean)
], tbl_teahouse.prototype, "integral_flag", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '隐私标志'
    }),
    __metadata("design:type", Boolean)
], tbl_teahouse.prototype, "privacy_flag", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '底分'
    }),
    __metadata("design:type", Number)
], tbl_teahouse.prototype, "end_points", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '参加分数'
    }),
    __metadata("design:type", Number)
], tbl_teahouse.prototype, "join_points", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '负分设置'
    }),
    __metadata("design:type", Boolean)
], tbl_teahouse.prototype, "point_setflag", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '积分调整选项'
    }),
    __metadata("design:type", Boolean)
], tbl_teahouse.prototype, "point_adjustflag", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '积分权限类型'
    }),
    __metadata("design:type", Number)
], tbl_teahouse.prototype, "point_permission", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '表情赠送对象'
    }),
    __metadata("design:type", Number)
], tbl_teahouse.prototype, "present_target", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '表情赠送次数'
    }),
    __metadata("design:type", Number)
], tbl_teahouse.prototype, "present_times", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '赠送积分'
    }),
    __metadata("design:type", Number)
], tbl_teahouse.prototype, "present_points", void 0);
tbl_teahouse = __decorate([
    sequelize_typescript_1.Table
], tbl_teahouse);
exports.tbl_teahouse = tbl_teahouse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX3RlYWhvdXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL21vZGVscy90YmxfdGVhaG91c2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwrREFBNEc7QUFHNUcsSUFBYSxZQUFZLEdBQXpCLGtCQUEwQixTQUFRLDRCQUFtQjtDQTZHcEQsQ0FBQTtBQXJHRztJQU5DLG9DQUFhO0lBQ2IsaUNBQVU7SUFDViw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN6QixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzs2Q0FDcUI7QUFNdkI7SUFKQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN6QixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzt5Q0FDaUI7QUFNbkI7SUFKQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN6QixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzswQ0FDa0I7QUFNcEI7SUFKQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUMzQixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzs0Q0FDb0I7QUFNdEI7SUFKQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUMxQixPQUFPLEVBQUUsVUFBVTtLQUN0QixDQUFDOztrREFDMEI7QUFLNUI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLGFBQWE7S0FDekIsQ0FBQzs7MENBQ2tCO0FBS3BCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxRQUFRO0tBQ3BCLENBQUM7OEJBQ2tCLElBQUk7aURBQUM7QUFLekI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7K0NBQ3dCO0FBSzFCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxTQUFTO0tBQ3JCLENBQUM7OzhDQUN1QjtBQUt6QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOztnREFDeUI7QUFLM0I7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLFdBQVc7S0FDdkIsQ0FBQzs7bURBQzRCO0FBSzlCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7O2tEQUMyQjtBQUs3QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDOztnREFDd0I7QUFLMUI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7aURBQ3lCO0FBSzNCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7O21EQUM0QjtBQUs5QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsUUFBUTtLQUNwQixDQUFDOztzREFDK0I7QUFLakM7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLFFBQVE7S0FDcEIsQ0FBQzs7c0RBQzhCO0FBS2hDO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxRQUFRO0tBQ3BCLENBQUM7O29EQUM0QjtBQUs5QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsUUFBUTtLQUNwQixDQUFDOzttREFDMkI7QUFLN0I7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7b0RBQzRCO0FBM0dyQixZQUFZO0lBRHhCLDRCQUFLO0dBQ08sWUFBWSxDQTZHeEI7QUE3R1ksb0NBQVkifQ==