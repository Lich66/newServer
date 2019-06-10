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
const STRING512 = 512;
const STRING1024 = 1024;
let tbl_mail_personal = 
// tslint:disable-next-line: class-name
class tbl_mail_personal extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column({
        comment: '邮件id'
    }),
    __metadata("design:type", Number)
], tbl_mail_personal.prototype, "msgid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '发送者id'
    }),
    __metadata("design:type", Number)
], tbl_mail_personal.prototype, "senderid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '接收者id'
    }),
    __metadata("design:type", Number)
], tbl_mail_personal.prototype, "receiverid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '邮件类型'
    }),
    __metadata("design:type", Number)
], tbl_mail_personal.prototype, "type", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING512),
        comment: '标题'
    }),
    __metadata("design:type", String)
], tbl_mail_personal.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING1024),
        comment: '内容'
    }),
    __metadata("design:type", String)
], tbl_mail_personal.prototype, "content", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '发送时间'
    }),
    __metadata("design:type", Date)
], tbl_mail_personal.prototype, "starttime", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '失效时间'
    }),
    __metadata("design:type", Date)
], tbl_mail_personal.prototype, "endtime", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column({
        comment: '是否已读(0:未读,1:已读)'
    }),
    __metadata("design:type", Number)
], tbl_mail_personal.prototype, "isread", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column({
        comment: '是否已操作(0:未操作,1:已同意,2:已拒绝)'
    }),
    __metadata("design:type", Number)
], tbl_mail_personal.prototype, "state", void 0);
tbl_mail_personal = __decorate([
    sequelize_typescript_1.Table({ timestamps: false })
    // tslint:disable-next-line: class-name
], tbl_mail_personal);
exports.tbl_mail_personal = tbl_mail_personal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX21haWxfcGVyc29uYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvbW9kZWxzL3RibF9tYWlsX3BlcnNvbmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0RBQTJGO0FBRTNGLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQztBQUN0QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFJeEIsSUFBYSxpQkFBaUI7QUFEOUIsdUNBQXVDO0FBQ3ZDLE1BQWEsaUJBQWtCLFNBQVEsNEJBQXdCO0NBdUQ5RCxDQUFBO0FBbERHO0lBSkMsaUNBQVU7SUFDViw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7Z0RBQ21CO0FBS3JCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxPQUFPO0tBQ25CLENBQUM7O21EQUNzQjtBQUt4QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsT0FBTztLQUNuQixDQUFDOztxREFDd0I7QUFLMUI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7K0NBQ2tCO0FBTXBCO0lBSkMsNkJBQU0sQ0FBQztRQUNKLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDaEMsT0FBTyxFQUFFLElBQUk7S0FDaEIsQ0FBQzs7Z0RBQ21CO0FBTXJCO0lBSkMsNkJBQU0sQ0FBQztRQUNKLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDakMsT0FBTyxFQUFFLElBQUk7S0FDaEIsQ0FBQzs7a0RBQ3FCO0FBS3ZCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7OEJBQ2dCLElBQUk7b0RBQUM7QUFLdkI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs4QkFDYyxJQUFJO2tEQUFDO0FBTXJCO0lBSkMsOEJBQU8sQ0FBQyxDQUFDLENBQUM7SUFDViw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLGlCQUFpQjtLQUM3QixDQUFDOztpREFDb0I7QUFNdEI7SUFKQyw4QkFBTyxDQUFDLENBQUMsQ0FBQztJQUNWLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsMEJBQTBCO0tBQ3RDLENBQUM7O2dEQUNtQjtBQXREWixpQkFBaUI7SUFGN0IsNEJBQUssQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUM3Qix1Q0FBdUM7R0FDMUIsaUJBQWlCLENBdUQ3QjtBQXZEWSw4Q0FBaUIifQ==