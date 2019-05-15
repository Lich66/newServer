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
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], tbl_user.prototype, "userid", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING(STRING64) }),
    __metadata("design:type", String)
], tbl_user.prototype, "usernick", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING(STRING512) }),
    __metadata("design:type", String)
], tbl_user.prototype, "image", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], tbl_user.prototype, "regtime", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], tbl_user.prototype, "diamond", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING(STRING32) }),
    __metadata("design:type", String)
], tbl_user.prototype, "region", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING(STRING32) }),
    __metadata("design:type", String)
], tbl_user.prototype, "ip", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], tbl_user.prototype, "sex", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING(STRING32) }),
    __metadata("design:type", String)
], tbl_user.prototype, "invite_code", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], tbl_user.prototype, "inviter", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], tbl_user.prototype, "logintime", void 0);
tbl_user = __decorate([
    sequelize_typescript_1.Table
    // tslint:disable-next-line: class-name
], tbl_user);
exports.tbl_user = tbl_user;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX3VzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvbW9kZWxzL3RibF91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0RBQWtGO0FBRWxGLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDO0FBS3RCLElBQWEsUUFBUTtBQURyQix1Q0FBdUM7QUFDdkMsY0FBc0IsU0FBUSw0QkFBZTtDQWtDNUMsQ0FBQTtBQS9CQztJQUZDLGlDQUFVO0lBQ1YsNkJBQU07O3dDQUNlO0FBR3RCO0lBREMsNkJBQU0sQ0FBQyxFQUFFLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDOzswQ0FDcEI7QUFHeEI7SUFEQyw2QkFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7O3VDQUN4QjtBQUdyQjtJQURDLDZCQUFNOzhCQUNTLElBQUk7eUNBQUM7QUFHckI7SUFEQyw2QkFBTTs7eUNBQ2dCO0FBR3ZCO0lBREMsNkJBQU0sQ0FBQyxFQUFFLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDOzt3Q0FDdEI7QUFHdEI7SUFEQyw2QkFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7O29DQUMxQjtBQUdsQjtJQURDLDZCQUFNOztxQ0FDWTtBQUduQjtJQURDLDZCQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQzs7NkNBQ2pCO0FBRzNCO0lBREMsNkJBQU07O3lDQUNnQjtBQUd2QjtJQURDLDZCQUFNOzhCQUNXLElBQUk7MkNBQUM7QUFqQ1osUUFBUTtJQUZwQiw0QkFBSztJQUNOLHVDQUF1QztHQUMxQixRQUFRLENBa0NwQjtBQWxDWSw0QkFBUSJ9