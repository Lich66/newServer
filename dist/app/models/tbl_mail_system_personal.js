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
let tbl_mail_system_personal = 
// tslint:disable-next-line: class-name
class tbl_mail_system_personal extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column({
        comment: '系统-个人邮件id'
    }),
    __metadata("design:type", Number)
], tbl_mail_system_personal.prototype, "msdid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '玩家id'
    }),
    __metadata("design:type", Number)
], tbl_mail_system_personal.prototype, "userid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '邮件id'
    }),
    __metadata("design:type", Number)
], tbl_mail_system_personal.prototype, "msgid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '是否已读(0:未读,1:已读)'
    }),
    __metadata("design:type", Number)
], tbl_mail_system_personal.prototype, "isread", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '是否已领取(0:未领取,1:已领取)'
    }),
    __metadata("design:type", Number)
], tbl_mail_system_personal.prototype, "isget", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '是否已删除(0:未删除,1:已删除)'
    }),
    __metadata("design:type", Number)
], tbl_mail_system_personal.prototype, "isdel", void 0);
tbl_mail_system_personal = __decorate([
    sequelize_typescript_1.Table({ timestamps: false })
    // tslint:disable-next-line: class-name
], tbl_mail_system_personal);
exports.tbl_mail_system_personal = tbl_mail_system_personal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX21haWxfc3lzdGVtX3BlcnNvbmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL21vZGVscy90YmxfbWFpbF9zeXN0ZW1fcGVyc29uYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwrREFBd0U7QUFJeEUsSUFBYSx3QkFBd0I7QUFEckMsdUNBQXVDO0FBQ3ZDLE1BQWEsd0JBQXlCLFNBQVEsNEJBQStCO0NBZ0M1RSxDQUFBO0FBM0JHO0lBSkMsaUNBQVU7SUFDViw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLFdBQVc7S0FDdkIsQ0FBQzs7dURBQ21CO0FBS3JCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7O3dEQUNvQjtBQUt0QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzt1REFDbUI7QUFLckI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLGlCQUFpQjtLQUM3QixDQUFDOzt3REFDb0I7QUFLdEI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLG9CQUFvQjtLQUNoQyxDQUFDOzt1REFDbUI7QUFLckI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLG9CQUFvQjtLQUNoQyxDQUFDOzt1REFDbUI7QUE5Qlosd0JBQXdCO0lBRnBDLDRCQUFLLENBQUMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDN0IsdUNBQXVDO0dBQzFCLHdCQUF3QixDQWdDcEM7QUFoQ1ksNERBQXdCIn0=