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
const tbl_clubuser_1 = require("./tbl_clubuser");
const STRING64 = 64;
const STRING32 = 32;
const STRING512 = 512;
let tbl_user = 
// tslint:disable-next-line: class-name
class tbl_user extends sequelize_typescript_1.Model {
    static makeUpperCase(instance) {
        // this will be called when an instance is created or updated
        instance.regtime = new Date();
    }
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.ForeignKey(() => tbl_clubuser_1.tbl_clubuser),
    sequelize_typescript_1.Column({
        comment: 'uid'
    }),
    __metadata("design:type", Number)
], tbl_user.prototype, "userid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING64),
        comment: '昵称'
    }),
    __metadata("design:type", String)
], tbl_user.prototype, "usernick", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING512),
        comment: '头像'
    }),
    __metadata("design:type", String)
], tbl_user.prototype, "image", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '注册时间'
    }),
    __metadata("design:type", Date)
], tbl_user.prototype, "regtime", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '钻石数'
    }),
    __metadata("design:type", Number)
], tbl_user.prototype, "diamond", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING32),
        comment: '注册地点'
    }),
    __metadata("design:type", String)
], tbl_user.prototype, "region", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING32),
        comment: '注册ip'
    }),
    __metadata("design:type", String)
], tbl_user.prototype, "ip", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '性别'
    }),
    __metadata("design:type", Number)
], tbl_user.prototype, "sex", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(7),
        comment: '邀请人的邀请码'
    }),
    __metadata("design:type", String)
], tbl_user.prototype, "inviter", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '最后登陆时间'
    }),
    __metadata("design:type", Date)
], tbl_user.prototype, "logintime", void 0);
__decorate([
    sequelize_typescript_1.Default(true),
    sequelize_typescript_1.Column({
        comment: '首冲标识'
    }),
    __metadata("design:type", Boolean)
], tbl_user.prototype, "first_pay", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '推广员标识'
    }),
    __metadata("design:type", Number)
], tbl_user.prototype, "generalize", void 0);
__decorate([
    sequelize_typescript_1.Default(true),
    sequelize_typescript_1.Column({
        comment: '首次分享标识'
    }),
    __metadata("design:type", Boolean)
], tbl_user.prototype, "first_share", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '每日分享时间'
    }),
    __metadata("design:type", Date)
], tbl_user.prototype, "share_time", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column({
        comment: '邀请状态(接收:0/拒收:1)'
    }),
    __metadata("design:type", Number)
], tbl_user.prototype, "invitation_status", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => tbl_clubuser_1.tbl_clubuser),
    __metadata("design:type", tbl_clubuser_1.tbl_clubuser)
], tbl_user.prototype, "tbl_clubuser", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tbl_user]),
    __metadata("design:returntype", void 0)
], tbl_user, "makeUpperCase", null);
tbl_user = __decorate([
    sequelize_typescript_1.Table({ timestamps: false })
    // tslint:disable-next-line: class-name
], tbl_user);
exports.tbl_user = tbl_user;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX3VzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvbW9kZWxzL3RibF91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0RBQWdJO0FBQ2hJLGlEQUE4QztBQUU5QyxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQztBQUl0QixJQUFhLFFBQVE7QUFEckIsdUNBQXVDO0FBQ3ZDLE1BQWEsUUFBUyxTQUFRLDRCQUFlO0lBeUJwQyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQWtCO1FBQzVDLDZEQUE2RDtRQUM3RCxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDaEMsQ0FBQztDQStERixDQUFBO0FBckZDO0lBTEMsaUNBQVU7SUFDVixpQ0FBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLDJCQUFZLENBQUM7SUFDOUIsNkJBQU0sQ0FBQztRQUNOLE9BQU8sRUFBRSxLQUFLO0tBQ2YsQ0FBQzs7d0NBQ29CO0FBTXRCO0lBSkMsNkJBQU0sQ0FBQztRQUNOLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDL0IsT0FBTyxFQUFFLElBQUk7S0FDZCxDQUFDOzswQ0FDc0I7QUFNeEI7SUFKQyw2QkFBTSxDQUFDO1FBQ04sSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNoQyxPQUFPLEVBQUUsSUFBSTtLQUNkLENBQUM7O3VDQUNtQjtBQUtyQjtJQUhDLDZCQUFNLENBQUM7UUFDTixPQUFPLEVBQUUsTUFBTTtLQUNoQixDQUFDOzhCQUNjLElBQUk7eUNBQUM7QUFVckI7SUFIQyw2QkFBTSxDQUFDO1FBQ04sT0FBTyxFQUFFLEtBQUs7S0FDZixDQUFDOzt5Q0FDcUI7QUFNdkI7SUFKQyw2QkFBTSxDQUFDO1FBQ04sSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUMvQixPQUFPLEVBQUUsTUFBTTtLQUNoQixDQUFDOzt3Q0FDb0I7QUFNdEI7SUFKQyw2QkFBTSxDQUFDO1FBQ04sSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUMvQixPQUFPLEVBQUUsTUFBTTtLQUNoQixDQUFDOztvQ0FDZ0I7QUFLbEI7SUFIQyw2QkFBTSxDQUFDO1FBQ04sT0FBTyxFQUFFLElBQUk7S0FDZCxDQUFDOztxQ0FDaUI7QUFNbkI7SUFKQyw2QkFBTSxDQUFDO1FBQ04sSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN4QixPQUFPLEVBQUUsU0FBUztLQUNuQixDQUFDOzt5Q0FDcUI7QUFLdkI7SUFIQyw2QkFBTSxDQUFDO1FBQ04sT0FBTyxFQUFFLFFBQVE7S0FDbEIsQ0FBQzs4QkFDZ0IsSUFBSTsyQ0FBQztBQUt2QjtJQUpDLDhCQUFPLENBQUMsSUFBSSxDQUFDO0lBQ2IsNkJBQU0sQ0FBQztRQUNOLE9BQU8sRUFBRSxNQUFNO0tBQ2hCLENBQUM7OzJDQUN3QjtBQUsxQjtJQUhDLDZCQUFNLENBQUM7UUFDTixPQUFPLEVBQUUsT0FBTztLQUNqQixDQUFDOzs0Q0FDd0I7QUFLMUI7SUFKQyw4QkFBTyxDQUFDLElBQUksQ0FBQztJQUNiLDZCQUFNLENBQUM7UUFDTixPQUFPLEVBQUUsUUFBUTtLQUNsQixDQUFDOzs2Q0FDMEI7QUFLNUI7SUFIQyw2QkFBTSxDQUFDO1FBQ04sT0FBTyxFQUFFLFFBQVE7S0FDbEIsQ0FBQzs4QkFDaUIsSUFBSTs0Q0FBQztBQU94QjtJQUxDLDhCQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ1YsNkJBQU0sQ0FBQztRQUNOLE9BQU8sRUFBRSxpQkFBaUI7S0FFM0IsQ0FBQzs7bURBQytCO0FBRWpDO0lBREMsZ0NBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQywyQkFBWSxDQUFDOzhCQUNULDJCQUFZOzhDQUFDO0FBakVsQztJQURDLG1DQUFZOztxQ0FDeUIsUUFBUTs7bUNBRzdDO0FBNUJVLFFBQVE7SUFGcEIsNEJBQUssQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUM3Qix1Q0FBdUM7R0FDMUIsUUFBUSxDQTJGcEI7QUEzRlksNEJBQVEifQ==