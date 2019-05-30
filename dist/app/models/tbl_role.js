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
let tbl_role = 
// tslint:disable-next-line: class-name
class tbl_role extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.BIGINT(BIGINT20),
        comment: 'roleid'
    }),
    __metadata("design:type", Number)
], tbl_role.prototype, "roleid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '账号'
    }),
    __metadata("design:type", String)
], tbl_role.prototype, "account", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '密码'
    }),
    __metadata("design:type", String)
], tbl_role.prototype, "password", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '盐'
    }),
    __metadata("design:type", String)
], tbl_role.prototype, "passsalt", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '权限'
    }),
    __metadata("design:type", Number)
], tbl_role.prototype, "role", void 0);
tbl_role = __decorate([
    sequelize_typescript_1.Table({ timestamps: false })
    // tslint:disable-next-line: class-name
], tbl_role);
exports.tbl_role = tbl_role;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX3JvbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvbW9kZWxzL3RibF9yb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0RBQWlHO0FBRWpHLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQztBQUd0QixJQUFhLFFBQVE7QUFEckIsdUNBQXVDO0FBQ3ZDLE1BQWEsUUFBUyxTQUFRLDRCQUFlO0NBNkI1QyxDQUFBO0FBdEJHO0lBTkMsb0NBQWE7SUFDYixpQ0FBVTtJQUNWLDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQy9CLE9BQU8sRUFBRSxRQUFRO0tBQ3BCLENBQUM7O3dDQUNvQjtBQUt0QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDOzt5Q0FDcUI7QUFLdkI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLElBQUk7S0FDaEIsQ0FBQzs7MENBQ3NCO0FBTXhCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxHQUFHO0tBQ2YsQ0FBQzs7MENBQ3NCO0FBS3hCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUM7O3NDQUNrQjtBQTVCWCxRQUFRO0lBRnBCLDRCQUFLLENBQUMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDN0IsdUNBQXVDO0dBQzFCLFFBQVEsQ0E2QnBCO0FBN0JZLDRCQUFRIn0=