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
const STRING16 = 16;
let tbl_agent = 
// tslint:disable-next-line: class-name
class tbl_agent extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column({
        comment: 'uid'
    }),
    __metadata("design:type", Number)
], tbl_agent.prototype, "userid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING16),
        comment: '邀请码'
    }),
    __metadata("design:type", String)
], tbl_agent.prototype, "invite_code", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '上级代理id'
    }),
    __metadata("design:type", Number)
], tbl_agent.prototype, "parent_id", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '代理大级别'
    }),
    __metadata("design:type", Number)
], tbl_agent.prototype, "big_level", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '代理小级别'
    }),
    __metadata("design:type", Number)
], tbl_agent.prototype, "small_level", void 0);
tbl_agent = __decorate([
    sequelize_typescript_1.Table({ timestamps: false })
    // tslint:disable-next-line: class-name
], tbl_agent);
exports.tbl_agent = tbl_agent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX2FnZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL21vZGVscy90YmxfYWdlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwrREFBa0Y7QUFDbEYsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBSXBCLElBQWEsU0FBUztBQUR0Qix1Q0FBdUM7QUFDdkMsTUFBYSxTQUFVLFNBQVEsNEJBQWdCO0NBMkI5QyxDQUFBO0FBdEJDO0lBSkMsaUNBQVU7SUFDViw2QkFBTSxDQUFDO1FBQ04sT0FBTyxFQUFFLEtBQUs7S0FDZixDQUFDOzt5Q0FDb0I7QUFNdEI7SUFKQyw2QkFBTSxDQUFDO1FBQ04sSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUMvQixPQUFPLEVBQUUsS0FBSztLQUNmLENBQUM7OzhDQUN5QjtBQUszQjtJQUhDLDZCQUFNLENBQUM7UUFDTixPQUFPLEVBQUUsUUFBUTtLQUNsQixDQUFDOzs0Q0FDdUI7QUFLekI7SUFIQyw2QkFBTSxDQUFDO1FBQ04sT0FBTyxFQUFFLE9BQU87S0FDakIsQ0FBQzs7NENBQ3VCO0FBS3pCO0lBSEMsNkJBQU0sQ0FBQztRQUNOLE9BQU8sRUFBRSxPQUFPO0tBQ2pCLENBQUM7OzhDQUN5QjtBQTFCaEIsU0FBUztJQUZyQiw0QkFBSyxDQUFDLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQzdCLHVDQUF1QztHQUMxQixTQUFTLENBMkJyQjtBQTNCWSw4QkFBUyJ9