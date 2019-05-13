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
let tbl_user = class tbl_user extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], tbl_user.prototype, "userid", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING(64) }),
    __metadata("design:type", String)
], tbl_user.prototype, "usernick", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING(512) }),
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
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING(32) }),
    __metadata("design:type", String)
], tbl_user.prototype, "region", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING(32) }),
    __metadata("design:type", String)
], tbl_user.prototype, "ip", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], tbl_user.prototype, "sex", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING(32) }),
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
], tbl_user);
exports.tbl_user = tbl_user;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX3VzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvbW9kZWxzL3RibF91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0RBQTBGO0FBRzFGLElBQWEsUUFBUSxHQUFyQixjQUFzQixTQUFRLDRCQUFlO0NBa0M1QyxDQUFBO0FBL0JDO0lBRkMsaUNBQVU7SUFDViw2QkFBTTs7d0NBQ2U7QUFHdEI7SUFEQyw2QkFBTSxDQUFDLEVBQUUsSUFBSSxFQUFDLCtCQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7OzBDQUNiO0FBR3hCO0lBREMsNkJBQU0sQ0FBQyxFQUFFLElBQUksRUFBQywrQkFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDOzt1Q0FDakI7QUFHckI7SUFEQyw2QkFBTTs4QkFDUyxJQUFJO3lDQUFDO0FBR3JCO0lBREMsNkJBQU07O3lDQUNnQjtBQUd2QjtJQURDLDZCQUFNLENBQUMsRUFBRSxJQUFJLEVBQUMsK0JBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQzs7d0NBQ2Y7QUFHdEI7SUFEQyw2QkFBTSxDQUFDLEVBQUUsSUFBSSxFQUFDLCtCQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7O29DQUNuQjtBQUdsQjtJQURDLDZCQUFNOztxQ0FDWTtBQUduQjtJQURDLDZCQUFNLENBQUMsRUFBRSxJQUFJLEVBQUMsK0JBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQzs7NkNBQ1Y7QUFHM0I7SUFEQyw2QkFBTTs7eUNBQ2dCO0FBR3ZCO0lBREMsNkJBQU07OEJBQ1csSUFBSTsyQ0FBQztBQWpDWixRQUFRO0lBRHBCLDRCQUFLO0dBQ08sUUFBUSxDQWtDcEI7QUFsQ1ksNEJBQVEifQ==