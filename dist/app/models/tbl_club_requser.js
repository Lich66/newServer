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
let tbl_club_requser = class tbl_club_requser extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.BIGINT(20),
        comment: '主键'
    }),
    __metadata("design:type", Number)
], tbl_club_requser.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '茶楼id'
    }),
    __metadata("design:type", Number)
], tbl_club_requser.prototype, "clubid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '用户id'
    }),
    __metadata("design:type", Number)
], tbl_club_requser.prototype, "userid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '申请时间'
    }),
    __metadata("design:type", Date)
], tbl_club_requser.prototype, "req_time", void 0);
tbl_club_requser = __decorate([
    sequelize_typescript_1.Table
], tbl_club_requser);
exports.tbl_club_requser = tbl_club_requser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX2NsdWJfcmVxdXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvdGJsX2NsdWJfcmVxdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLCtEQUF1SDtBQUd2SCxJQUFhLGdCQUFnQixHQUE3QixzQkFBOEIsU0FBUSw0QkFBdUI7Q0F5QjVELENBQUE7QUFqQkc7SUFOQyxvQ0FBYTtJQUNiLGlDQUFVO0lBQ1YsNkJBQU0sQ0FBQztRQUNKLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDekIsT0FBTyxFQUFFLElBQUk7S0FDaEIsQ0FBQzs7NENBQ2dCO0FBS2xCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7O2dEQUNvQjtBQUt0QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOztnREFDb0I7QUFLdEI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs4QkFDZSxJQUFJO2tEQUFDO0FBdkJiLGdCQUFnQjtJQUQ1Qiw0QkFBSztHQUNPLGdCQUFnQixDQXlCNUI7QUF6QlksNENBQWdCIn0=