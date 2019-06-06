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
let tbl_rechargelog = 
// tslint:disable-next-line: class-name
class tbl_rechargelog extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.BIGINT(BIGINT20),
        comment: '充值id'
    }),
    __metadata("design:type", Number)
], tbl_rechargelog.prototype, "rechargeid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '订单流水号'
    }),
    __metadata("design:type", String)
], tbl_rechargelog.prototype, "oderid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: 'uid'
    }),
    __metadata("design:type", Number)
], tbl_rechargelog.prototype, "userid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.FLOAT(8),
        comment: '充值金额'
    }),
    __metadata("design:type", Number)
], tbl_rechargelog.prototype, "money", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '获得的钻石数'
    }),
    __metadata("design:type", Number)
], tbl_rechargelog.prototype, "diamond", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '赠送的钻石数'
    }),
    __metadata("design:type", Number)
], tbl_rechargelog.prototype, "extra", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '充值时间'
    }),
    __metadata("design:type", Date)
], tbl_rechargelog.prototype, "rechargetime", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '渠道'
    }),
    __metadata("design:type", String)
], tbl_rechargelog.prototype, "pf", void 0);
tbl_rechargelog = __decorate([
    sequelize_typescript_1.Table({ timestamps: false })
    // tslint:disable-next-line: class-name
], tbl_rechargelog);
exports.tbl_rechargelog = tbl_rechargelog;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX3JlY2hhcmdlTG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL21vZGVscy90YmxfcmVjaGFyZ2VMb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwrREFBa0Y7QUFFbEYsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBSXRCLElBQWEsZUFBZTtBQUQ1Qix1Q0FBdUM7QUFDdkMsTUFBYSxlQUFnQixTQUFRLDRCQUFzQjtDQThDMUQsQ0FBQTtBQXhDRztJQUxDLGlDQUFVO0lBQ1YsNkJBQU0sQ0FBQztRQUNKLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDL0IsT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7bURBQ3dCO0FBSzFCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxPQUFPO0tBQ25CLENBQUM7OytDQUNvQjtBQUt0QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsS0FBSztLQUNqQixDQUFDOzsrQ0FDb0I7QUFPdEI7SUFKQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN2QixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzs4Q0FDbUI7QUFNckI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLFFBQVE7S0FDcEIsQ0FBQzs7Z0RBQ3FCO0FBS3ZCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxRQUFRO0tBQ3BCLENBQUM7OzhDQUNtQjtBQUtyQjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzhCQUNtQixJQUFJO3FEQUFDO0FBSzFCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUM7OzJDQUNnQjtBQTVDVCxlQUFlO0lBRjNCLDRCQUFLLENBQUMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDN0IsdUNBQXVDO0dBQzFCLGVBQWUsQ0E4QzNCO0FBOUNZLDBDQUFlIn0=