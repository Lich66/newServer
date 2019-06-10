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
const tbl_user_1 = require("./tbl_user");
const BIGINT20 = '20';
const STRING64 = 64;
let tbl_clubuser = 
// tslint:disable-next-line: class-name
class tbl_clubuser extends sequelize_typescript_1.Model {
    static makeUpperCase(instance) {
        // this will be called when an instance is created or updated
        instance.adtime = new Date();
    }
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
    sequelize_typescript_1.Default(5),
    sequelize_typescript_1.Column({
        comment: '角色'
    }),
    __metadata("design:type", Number)
], tbl_clubuser.prototype, "chactor", void 0);
__decorate([
    sequelize_typescript_1.Column({
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
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column({
        comment: '积分'
    }),
    __metadata("design:type", Number)
], tbl_clubuser.prototype, "points", void 0);
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column({
        comment: '冻结标志'
    }),
    __metadata("design:type", Boolean)
], tbl_clubuser.prototype, "freeze_flag", void 0);
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column({
        comment: '助手标志'
    }),
    __metadata("design:type", Boolean)
], tbl_clubuser.prototype, "assist_flag", void 0);
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column({
        comment: '代付标志'
    }),
    __metadata("design:type", Boolean)
], tbl_clubuser.prototype, "pay_flag", void 0);
__decorate([
    sequelize_typescript_1.HasOne(() => tbl_user_1.tbl_user),
    __metadata("design:type", tbl_user_1.tbl_user)
], tbl_clubuser.prototype, "tbl_user", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tbl_clubuser]),
    __metadata("design:returntype", void 0)
], tbl_clubuser, "makeUpperCase", null);
tbl_clubuser = __decorate([
    sequelize_typescript_1.Table({ timestamps: false })
    // tslint:disable-next-line: class-name
], tbl_clubuser);
exports.tbl_clubuser = tbl_clubuser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX2NsdWJ1c2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL21vZGVscy90YmxfY2x1YnVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwrREFBZ0k7QUFDaEkseUNBQXNDO0FBRXRDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQztBQUN0QixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFHcEIsSUFBYSxZQUFZO0FBRHpCLHVDQUF1QztBQUN2QyxNQUFhLFlBQWEsU0FBUSw0QkFBbUI7SUErQjFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBc0I7UUFDOUMsNkRBQTZEO1FBQzdELFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0NBa0NKLENBQUE7QUE1REc7SUFOQyxvQ0FBYTtJQUNiLGlDQUFVO0lBQ1YsNkJBQU0sQ0FBQztRQUNKLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDL0IsT0FBTyxFQUFFLElBQUk7S0FDaEIsQ0FBQzs7eUNBQ2lCO0FBS25CO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7OzRDQUNvQjtBQUt0QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzs0Q0FDb0I7QUFNdEI7SUFKQyw4QkFBTyxDQUFDLENBQUMsQ0FBQztJQUNWLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDOzs2Q0FDcUI7QUFLdkI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs4QkFDYSxJQUFJOzRDQUFDO0FBV3BCO0lBSkMsNkJBQU0sQ0FBQztRQUNKLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDL0IsT0FBTyxFQUFFLEtBQUs7S0FDakIsQ0FBQzs7NkNBQ3FCO0FBTXZCO0lBSkMsOEJBQU8sQ0FBQyxDQUFDLENBQUM7SUFDViw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLElBQUk7S0FDaEIsQ0FBQzs7NENBQ29CO0FBTXRCO0lBSkMsOEJBQU8sQ0FBQyxLQUFLLENBQUM7SUFDZCw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7aURBQzBCO0FBTTVCO0lBSkMsOEJBQU8sQ0FBQyxLQUFLLENBQUM7SUFDZCw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7aURBQzBCO0FBTTVCO0lBSkMsOEJBQU8sQ0FBQyxLQUFLLENBQUM7SUFDZCw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7OENBQ3VCO0FBR3pCO0lBREMsNkJBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxtQkFBUSxDQUFDOzhCQUNOLG1CQUFROzhDQUFDO0FBcEMxQjtJQURDLG1DQUFZOztxQ0FDeUIsWUFBWTs7dUNBR2pEO0FBbENRLFlBQVk7SUFGeEIsNEJBQUssQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUM3Qix1Q0FBdUM7R0FDMUIsWUFBWSxDQW9FeEI7QUFwRVksb0NBQVkifQ==