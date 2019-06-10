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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX3VzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvbW9kZWxzL3RibF91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0RBQW9IO0FBQ3BILGlEQUE4QztBQUU5QyxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQztBQUl0QixJQUFhLFFBQVE7QUFEckIsdUNBQXVDO0FBQ3ZDLE1BQWEsUUFBUyxTQUFRLDRCQUFlO0lBd0JwQyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQWtCO1FBQzVDLDZEQUE2RDtRQUM3RCxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDaEMsQ0FBQztDQStERixDQUFBO0FBckZDO0lBSkMsaUNBQVU7SUFDViw2QkFBTSxDQUFDO1FBQ04sT0FBTyxFQUFFLEtBQUs7S0FDZixDQUFDOzt3Q0FDb0I7QUFNdEI7SUFKQyw2QkFBTSxDQUFDO1FBQ04sSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUMvQixPQUFPLEVBQUUsSUFBSTtLQUNkLENBQUM7OzBDQUNzQjtBQU14QjtJQUpDLDZCQUFNLENBQUM7UUFDTixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ2hDLE9BQU8sRUFBRSxJQUFJO0tBQ2QsQ0FBQzs7dUNBQ21CO0FBS3JCO0lBSEMsNkJBQU0sQ0FBQztRQUNOLE9BQU8sRUFBRSxNQUFNO0tBQ2hCLENBQUM7OEJBQ2MsSUFBSTt5Q0FBQztBQVVyQjtJQUhDLDZCQUFNLENBQUM7UUFDTixPQUFPLEVBQUUsS0FBSztLQUNmLENBQUM7O3lDQUNxQjtBQU12QjtJQUpDLDZCQUFNLENBQUM7UUFDTixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQy9CLE9BQU8sRUFBRSxNQUFNO0tBQ2hCLENBQUM7O3dDQUNvQjtBQU10QjtJQUpDLDZCQUFNLENBQUM7UUFDTixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQy9CLE9BQU8sRUFBRSxNQUFNO0tBQ2hCLENBQUM7O29DQUNnQjtBQUtsQjtJQUhDLDZCQUFNLENBQUM7UUFDTixPQUFPLEVBQUUsSUFBSTtLQUNkLENBQUM7O3FDQUNpQjtBQU1uQjtJQUpDLDZCQUFNLENBQUM7UUFDTixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE9BQU8sRUFBRSxTQUFTO0tBQ25CLENBQUM7O3lDQUNxQjtBQUt2QjtJQUhDLDZCQUFNLENBQUM7UUFDTixPQUFPLEVBQUUsUUFBUTtLQUNsQixDQUFDOzhCQUNnQixJQUFJOzJDQUFDO0FBS3ZCO0lBSkMsOEJBQU8sQ0FBQyxJQUFJLENBQUM7SUFDYiw2QkFBTSxDQUFDO1FBQ04sT0FBTyxFQUFFLE1BQU07S0FDaEIsQ0FBQzs7MkNBQ3dCO0FBSzFCO0lBSEMsNkJBQU0sQ0FBQztRQUNOLE9BQU8sRUFBRSxPQUFPO0tBQ2pCLENBQUM7OzRDQUN3QjtBQUsxQjtJQUpDLDhCQUFPLENBQUMsSUFBSSxDQUFDO0lBQ2IsNkJBQU0sQ0FBQztRQUNOLE9BQU8sRUFBRSxRQUFRO0tBQ2xCLENBQUM7OzZDQUMwQjtBQUs1QjtJQUhDLDZCQUFNLENBQUM7UUFDTixPQUFPLEVBQUUsUUFBUTtLQUNsQixDQUFDOzhCQUNpQixJQUFJOzRDQUFDO0FBT3hCO0lBTEMsOEJBQU8sQ0FBQyxDQUFDLENBQUM7SUFDViw2QkFBTSxDQUFDO1FBQ04sT0FBTyxFQUFFLGlCQUFpQjtLQUUzQixDQUFDOzttREFDK0I7QUFFakM7SUFEQyxnQ0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLDJCQUFZLENBQUM7OEJBQ1QsMkJBQVk7OENBQUM7QUFqRWxDO0lBREMsbUNBQVk7O3FDQUN5QixRQUFROzttQ0FHN0M7QUEzQlUsUUFBUTtJQUZwQiw0QkFBSyxDQUFDLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQzdCLHVDQUF1QztHQUMxQixRQUFRLENBMEZwQjtBQTFGWSw0QkFBUSJ9