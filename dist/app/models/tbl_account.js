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
let tbl_account = 
// tslint:disable-next-line: class-name
class tbl_account extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING(STRING64) }),
    __metadata("design:type", String)
], tbl_account.prototype, "token", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING(STRING64) }),
    __metadata("design:type", String)
], tbl_account.prototype, "wxopenid", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING(STRING64) }),
    __metadata("design:type", String)
], tbl_account.prototype, "xlopenid", void 0);
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], tbl_account.prototype, "uid", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING(STRING64) }),
    __metadata("design:type", String)
], tbl_account.prototype, "account", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING(STRING64) }),
    __metadata("design:type", String)
], tbl_account.prototype, "password", void 0);
tbl_account = __decorate([
    sequelize_typescript_1.Table
    // tslint:disable-next-line: class-name
], tbl_account);
exports.tbl_account = tbl_account;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX2FjY291bnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvbW9kZWxzL3RibF9hY2NvdW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0RBQWlHO0FBRWpHLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUdwQixJQUFhLFdBQVc7QUFEeEIsdUNBQXVDO0FBQ3ZDLGlCQUF5QixTQUFRLDRCQUFrQjtDQXNCbEQsQ0FBQTtBQW5CQztJQURDLDZCQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQzs7MENBQ3ZCO0FBR3JCO0lBREMsNkJBQU0sQ0FBQyxFQUFFLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDOzs2Q0FDcEI7QUFHeEI7SUFEQyw2QkFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7OzZDQUNwQjtBQUt4QjtJQUhDLG9DQUFhO0lBQ2IsaUNBQVU7SUFDViw2QkFBTTs7d0NBQ1k7QUFHbkI7SUFEQyw2QkFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7OzRDQUNyQjtBQUd2QjtJQURDLDZCQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQzs7NkNBQ3BCO0FBcEJiLFdBQVc7SUFGdkIsNEJBQUs7SUFDTix1Q0FBdUM7R0FDMUIsV0FBVyxDQXNCdkI7QUF0Qlksa0NBQVcifQ==