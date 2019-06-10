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
const STRING512 = 512;
const STRING1024 = 1024;
const STRING65533 = 65533;
let tbl_mail_system = 
// tslint:disable-next-line: class-name
class tbl_mail_system extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column({
        comment: '邮件id'
    }),
    __metadata("design:type", Number)
], tbl_mail_system.prototype, "msgid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '邮件类型'
    }),
    __metadata("design:type", Number)
], tbl_mail_system.prototype, "type", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING512),
        comment: '标题'
    }),
    __metadata("design:type", String)
], tbl_mail_system.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING1024),
        comment: '内容'
    }),
    __metadata("design:type", String)
], tbl_mail_system.prototype, "content", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING512),
        comment: '附件'
    }),
    __metadata("design:type", String)
], tbl_mail_system.prototype, "items", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING64),
        comment: '署名'
    }),
    __metadata("design:type", String)
], tbl_mail_system.prototype, "signature", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '生效时间'
    }),
    __metadata("design:type", Date)
], tbl_mail_system.prototype, "starttime", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '失效时间'
    }),
    __metadata("design:type", Date)
], tbl_mail_system.prototype, "endtime", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING65533),
        comment: '对象条件'
    }),
    __metadata("design:type", String)
], tbl_mail_system.prototype, "condition", void 0);
tbl_mail_system = __decorate([
    sequelize_typescript_1.Table({ timestamps: false })
    // tslint:disable-next-line: class-name
], tbl_mail_system);
exports.tbl_mail_system = tbl_mail_system;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX21haWxfc3lzdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL21vZGVscy90YmxfbWFpbF9zeXN0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwrREFBa0Y7QUFFbEYsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQztBQUN0QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDeEIsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDO0FBSTFCLElBQWEsZUFBZTtBQUQ1Qix1Q0FBdUM7QUFDdkMsTUFBYSxlQUFnQixTQUFRLDRCQUFzQjtDQW9EMUQsQ0FBQTtBQS9DRztJQUpDLGlDQUFVO0lBQ1YsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7OzhDQUNtQjtBQUtyQjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzs2Q0FDa0I7QUFNcEI7SUFKQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNoQyxPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDOzs4Q0FDbUI7QUFNckI7SUFKQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNqQyxPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDOztnREFDcUI7QUFNdkI7SUFKQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNoQyxPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDOzs4Q0FDbUI7QUFNckI7SUFKQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUMvQixPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDOztrREFDdUI7QUFLekI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs4QkFDZ0IsSUFBSTtrREFBQztBQUt2QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzhCQUNjLElBQUk7Z0RBQUM7QUFNckI7SUFKQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUNsQyxPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOztrREFDdUI7QUFsRGhCLGVBQWU7SUFGM0IsNEJBQUssQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUM3Qix1Q0FBdUM7R0FDMUIsZUFBZSxDQW9EM0I7QUFwRFksMENBQWUifQ==