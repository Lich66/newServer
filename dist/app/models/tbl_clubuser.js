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
    sequelize_typescript_1.Default(4),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX2NsdWJ1c2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL21vZGVscy90YmxfY2x1YnVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwrREFBd0g7QUFFeEgsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUdwQixJQUFhLFlBQVk7QUFEekIsdUNBQXVDO0FBQ3ZDLE1BQWEsWUFBYSxTQUFRLDRCQUFtQjtJQStCMUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFzQjtRQUM5Qyw2REFBNkQ7UUFDN0QsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ2pDLENBQUM7Q0FnQ0osQ0FBQTtBQTFERztJQU5DLG9DQUFhO0lBQ2IsaUNBQVU7SUFDViw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUMvQixPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDOzt5Q0FDaUI7QUFLbkI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7NENBQ29CO0FBS3RCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7OzRDQUNvQjtBQU10QjtJQUpDLDhCQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ1YsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUM7OzZDQUNxQjtBQUt2QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzhCQUNhLElBQUk7NENBQUM7QUFXcEI7SUFKQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUMvQixPQUFPLEVBQUUsS0FBSztLQUNqQixDQUFDOzs2Q0FDcUI7QUFNdkI7SUFKQyw4QkFBTyxDQUFDLENBQUMsQ0FBQztJQUNWLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDOzs0Q0FDb0I7QUFNdEI7SUFKQyw4QkFBTyxDQUFDLEtBQUssQ0FBQztJQUNkLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOztpREFDMEI7QUFNNUI7SUFKQyw4QkFBTyxDQUFDLEtBQUssQ0FBQztJQUNkLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOztpREFDMEI7QUFNNUI7SUFKQyw4QkFBTyxDQUFDLEtBQUssQ0FBQztJQUNkLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzs4Q0FDdUI7QUFqQ3pCO0lBREMsbUNBQVk7O3FDQUN5QixZQUFZOzt1Q0FHakQ7QUFsQ1EsWUFBWTtJQUZ4Qiw0QkFBSyxDQUFDLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQzdCLHVDQUF1QztHQUMxQixZQUFZLENBa0V4QjtBQWxFWSxvQ0FBWSJ9