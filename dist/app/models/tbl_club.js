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
let tbl_club = class tbl_club extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.BIGINT(20),
        comment: '茶楼id'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "houseid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(64),
        comment: '所属玩家'
    }),
    __metadata("design:type", String)
], tbl_club.prototype, "uid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(32),
        comment: '茶楼名字'
    }),
    __metadata("design:type", String)
], tbl_club.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(2048),
        comment: '茶楼公告'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "notice", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(512),
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
        comment: '茶楼创建时间'
    }),
    __metadata("design:type", Date)
], tbl_club.prototype, "create_time", void 0);
__decorate([
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
tbl_club = __decorate([
    sequelize_typescript_1.Table
], tbl_club);
exports.tbl_club = tbl_club;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX2NsdWIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvbW9kZWxzL3RibF9jbHViLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0RBQTRHO0FBRzVHLElBQWEsUUFBUSxHQUFyQixjQUFzQixTQUFRLDRCQUFlO0NBNkc1QyxDQUFBO0FBckdHO0lBTkMsb0NBQWE7SUFDYixpQ0FBVTtJQUNWLDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3pCLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7O3lDQUNxQjtBQU12QjtJQUpDLDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3pCLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7O3FDQUNpQjtBQU1uQjtJQUpDLDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3pCLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7O3NDQUNrQjtBQU1wQjtJQUpDLDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQzNCLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7O3dDQUNvQjtBQU10QjtJQUpDLDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQzFCLE9BQU8sRUFBRSxVQUFVO0tBQ3RCLENBQUM7OzhDQUMwQjtBQUs1QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsYUFBYTtLQUN6QixDQUFDOztzQ0FDa0I7QUFLcEI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLFFBQVE7S0FDcEIsQ0FBQzs4QkFDa0IsSUFBSTs2Q0FBQztBQUt6QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzsyQ0FDd0I7QUFLMUI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLFNBQVM7S0FDckIsQ0FBQzs7MENBQ3VCO0FBS3pCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7OzRDQUN5QjtBQUszQjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsV0FBVztLQUN2QixDQUFDOzsrQ0FDNEI7QUFLOUI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7OENBQzJCO0FBSzdCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUM7OzRDQUN3QjtBQUsxQjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzs2Q0FDeUI7QUFLM0I7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7K0NBQzRCO0FBSzlCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxRQUFRO0tBQ3BCLENBQUM7O2tEQUMrQjtBQUtqQztJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsUUFBUTtLQUNwQixDQUFDOztrREFDOEI7QUFLaEM7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLFFBQVE7S0FDcEIsQ0FBQzs7Z0RBQzRCO0FBSzlCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxRQUFRO0tBQ3BCLENBQUM7OytDQUMyQjtBQUs3QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOztnREFDNEI7QUEzR3JCLFFBQVE7SUFEcEIsNEJBQUs7R0FDTyxRQUFRLENBNkdwQjtBQTdHWSw0QkFBUSJ9