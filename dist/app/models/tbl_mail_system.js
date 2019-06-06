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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX21haWxfc3lzdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL21vZGVscy90YmxfbWFpbF9zeXN0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwrREFBa0Y7QUFFbEYsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDO0FBQ3RCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQztBQUN4QixNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUM7QUFJMUIsSUFBYSxlQUFlO0FBRDVCLHVDQUF1QztBQUN2QyxNQUFhLGVBQWdCLFNBQVEsNEJBQXNCO0NBOEMxRCxDQUFBO0FBekNHO0lBSkMsaUNBQVU7SUFDViw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7OENBQ21CO0FBS3JCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7OzZDQUNrQjtBQU1wQjtJQUpDLDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ2hDLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUM7OzhDQUNtQjtBQU1yQjtJQUpDLDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ2pDLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUM7O2dEQUNxQjtBQU12QjtJQUpDLDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ2hDLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUM7OzhDQUNtQjtBQUtyQjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzhCQUNnQixJQUFJO2tEQUFDO0FBS3ZCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7OEJBQ2MsSUFBSTtnREFBQztBQU1yQjtJQUpDLDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ2xDLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7O2tEQUN1QjtBQTVDaEIsZUFBZTtJQUYzQiw0QkFBSyxDQUFDLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQzdCLHVDQUF1QztHQUMxQixlQUFlLENBOEMzQjtBQTlDWSwwQ0FBZSJ9