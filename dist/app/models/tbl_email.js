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
let tbl_email = 
// tslint:disable-next-line: class-name
class tbl_email extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column({
        comment: '邮件id'
    }),
    __metadata("design:type", Number)
], tbl_email.prototype, "msgid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '接收者id'
    }),
    __metadata("design:type", Number)
], tbl_email.prototype, "userid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '邮件类型'
    }),
    __metadata("design:type", Number)
], tbl_email.prototype, "type", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING512),
        comment: '标题'
    }),
    __metadata("design:type", String)
], tbl_email.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING512),
        comment: '内容'
    }),
    __metadata("design:type", String)
], tbl_email.prototype, "content", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING32),
        comment: '发送时间'
    }),
    __metadata("design:type", String)
], tbl_email.prototype, "sendTime", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '是否已读(0:未读,1:已读)'
    }),
    __metadata("design:type", Number)
], tbl_email.prototype, "isRead", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING512),
        comment: '附件'
    }),
    __metadata("design:type", String)
], tbl_email.prototype, "items", void 0);
tbl_email = __decorate([
    sequelize_typescript_1.Table({ timestamps: false })
    // tslint:disable-next-line: class-name
], tbl_email);
exports.tbl_email = tbl_email;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX2VtYWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL21vZGVscy90YmxfZW1haWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwrREFBa0Y7QUFFbEYsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUM7QUFLdEIsSUFBYSxTQUFTO0FBRHRCLHVDQUF1QztBQUN2QyxNQUFhLFNBQVUsU0FBUSw0QkFBZ0I7Q0E2QzlDLENBQUE7QUF4Q0c7SUFKQyxpQ0FBVTtJQUNWLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzt3Q0FDbUI7QUFLckI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE9BQU87S0FDbkIsQ0FBQzs7eUNBQ29CO0FBS3RCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7O3VDQUNrQjtBQU1wQjtJQUpDLDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ2hDLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUM7O3dDQUNtQjtBQU1yQjtJQUpDLDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ2hDLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUM7OzBDQUNxQjtBQU12QjtJQUpDLDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQy9CLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7OzJDQUNzQjtBQUt4QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsaUJBQWlCO0tBQzdCLENBQUM7O3lDQUNvQjtBQU10QjtJQUpDLDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ2hDLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUM7O3dDQUNtQjtBQTVDWixTQUFTO0lBRnJCLDRCQUFLLENBQUMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDN0IsdUNBQXVDO0dBQzFCLFNBQVMsQ0E2Q3JCO0FBN0NZLDhCQUFTIn0=