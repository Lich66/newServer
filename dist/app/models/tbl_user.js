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
        type: sequelize_typescript_1.DataType.STRING(STRING32),
        comment: '邀请码'
    }),
    __metadata("design:type", String)
], tbl_user.prototype, "invite_code", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '邀请人'
    }),
    __metadata("design:type", Number)
], tbl_user.prototype, "inviter", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '最后登陆时间'
    }),
    __metadata("design:type", Date)
], tbl_user.prototype, "logintime", void 0);
__decorate([
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX3VzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvbW9kZWxzL3RibF91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0RBQWdHO0FBRWhHLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDO0FBS3RCLElBQWEsUUFBUTtBQURyQix1Q0FBdUM7QUFDdkMsTUFBYSxRQUFTLFNBQVEsNEJBQWU7SUF3QnBDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBa0I7UUFDNUMsNkRBQTZEO1FBQzdELFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0NBMkRGLENBQUE7QUFqRkM7SUFKQyxpQ0FBVTtJQUNWLDZCQUFNLENBQUM7UUFDTixPQUFPLEVBQUUsS0FBSztLQUNmLENBQUM7O3dDQUNvQjtBQU10QjtJQUpDLDZCQUFNLENBQUM7UUFDTixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQy9CLE9BQU8sRUFBRSxJQUFJO0tBQ2QsQ0FBQzs7MENBQ3NCO0FBTXhCO0lBSkMsNkJBQU0sQ0FBQztRQUNOLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDaEMsT0FBTyxFQUFFLElBQUk7S0FDZCxDQUFDOzt1Q0FDbUI7QUFLckI7SUFIQyw2QkFBTSxDQUFDO1FBQ04sT0FBTyxFQUFFLE1BQU07S0FDaEIsQ0FBQzs4QkFDYyxJQUFJO3lDQUFDO0FBVXJCO0lBSEMsNkJBQU0sQ0FBQztRQUNOLE9BQU8sRUFBRSxLQUFLO0tBQ2YsQ0FBQzs7eUNBQ3FCO0FBTXZCO0lBSkMsNkJBQU0sQ0FBQztRQUNOLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDL0IsT0FBTyxFQUFFLE1BQU07S0FDaEIsQ0FBQzs7d0NBQ29CO0FBTXRCO0lBSkMsNkJBQU0sQ0FBQztRQUNOLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDL0IsT0FBTyxFQUFFLE1BQU07S0FDaEIsQ0FBQzs7b0NBQ2dCO0FBS2xCO0lBSEMsNkJBQU0sQ0FBQztRQUNOLE9BQU8sRUFBRSxJQUFJO0tBQ2QsQ0FBQzs7cUNBQ2lCO0FBTW5CO0lBSkMsNkJBQU0sQ0FBQztRQUNOLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDL0IsT0FBTyxFQUFFLEtBQUs7S0FDZixDQUFDOzs2Q0FDeUI7QUFLM0I7SUFIQyw2QkFBTSxDQUFDO1FBQ04sT0FBTyxFQUFFLEtBQUs7S0FDZixDQUFDOzt5Q0FDcUI7QUFLdkI7SUFIQyw2QkFBTSxDQUFDO1FBQ04sT0FBTyxFQUFFLFFBQVE7S0FDbEIsQ0FBQzs4QkFDZ0IsSUFBSTsyQ0FBQztBQUt2QjtJQUhDLDZCQUFNLENBQUM7UUFDTixPQUFPLEVBQUUsTUFBTTtLQUNoQixDQUFDOzsyQ0FDd0I7QUFLMUI7SUFIQyw2QkFBTSxDQUFDO1FBQ04sT0FBTyxFQUFFLE9BQU87S0FDakIsQ0FBQzs7NENBQ3dCO0FBSzFCO0lBSEMsNkJBQU0sQ0FBQztRQUNOLE9BQU8sRUFBRSxRQUFRO0tBQ2xCLENBQUM7OzZDQUMwQjtBQUs1QjtJQUhDLDZCQUFNLENBQUM7UUFDTixPQUFPLEVBQUUsUUFBUTtLQUNsQixDQUFDOzhCQUNpQixJQUFJOzRDQUFDO0FBN0R4QjtJQURDLG1DQUFZOztxQ0FDeUIsUUFBUTs7bUNBRzdDO0FBM0JVLFFBQVE7SUFGcEIsNEJBQUssQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUM3Qix1Q0FBdUM7R0FDMUIsUUFBUSxDQXNGcEI7QUF0RlksNEJBQVEifQ==