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
let Bullfight_MingPaiQiangZhuang = 
// tslint:disable-next-line: class-name
class Bullfight_MingPaiQiangZhuang extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiQiangZhuang.prototype, "index", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiQiangZhuang.prototype, "GameType", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiQiangZhuang.prototype, "GamePlay", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiQiangZhuang.prototype, "OpenDeskNum", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiQiangZhuang.prototype, "BottomPouring", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiQiangZhuang.prototype, "SetQuotient", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiQiangZhuang.prototype, "RoomPayMode", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiQiangZhuang.prototype, "RoomPayCost", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiQiangZhuang.prototype, "StartGameMode", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiQiangZhuang.prototype, "BolusChoose", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiQiangZhuang.prototype, "MaximumBank", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiQiangZhuang.prototype, "DoubleRule", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiQiangZhuang.prototype, "SpecialDoubleRule", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiQiangZhuang.prototype, "HighLevelChoose", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiQiangZhuang.prototype, "WangLaiMode", void 0);
Bullfight_MingPaiQiangZhuang = __decorate([
    sequelize_typescript_1.Table({ timestamps: false })
    // tslint:disable-next-line: class-name
], Bullfight_MingPaiQiangZhuang);
exports.Bullfight_MingPaiQiangZhuang = Bullfight_MingPaiQiangZhuang;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnVsbGZpZ2h0X01pbmdQYWlRaWFuZ1podWFuZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvQnVsbGZpZ2h0X01pbmdQYWlRaWFuZ1podWFuZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLCtEQUF3RTtBQUl4RSxJQUFhLDRCQUE0QjtBQUR6Qyx1Q0FBdUM7QUFDdkMsTUFBYSw0QkFBNkIsU0FBUSw0QkFBbUM7Q0FnRHBGLENBQUE7QUE1Q0M7SUFGQyxpQ0FBVTtJQUNWLDZCQUFNOzsyREFDYztBQUdyQjtJQURDLDZCQUFNOzs4REFDaUI7QUFHeEI7SUFEQyw2QkFBTTs7OERBQ2lCO0FBR3hCO0lBREMsNkJBQU07O2lFQUNvQjtBQUczQjtJQURDLDZCQUFNOzttRUFDc0I7QUFHN0I7SUFEQyw2QkFBTTs7aUVBQ29CO0FBRzNCO0lBREMsNkJBQU07O2lFQUNvQjtBQUczQjtJQURDLDZCQUFNOztpRUFDb0I7QUFHM0I7SUFEQyw2QkFBTTs7bUVBQ3NCO0FBRzdCO0lBREMsNkJBQU07O2lFQUNvQjtBQUczQjtJQURDLDZCQUFNOztpRUFDb0I7QUFHM0I7SUFEQyw2QkFBTTs7Z0VBQ21CO0FBRzFCO0lBREMsNkJBQU07O3VFQUMwQjtBQUdqQztJQURDLDZCQUFNOztxRUFDd0I7QUFHL0I7SUFEQyw2QkFBTTs7aUVBQ29CO0FBOUNoQiw0QkFBNEI7SUFGeEMsNEJBQUssQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUM3Qix1Q0FBdUM7R0FDMUIsNEJBQTRCLENBZ0R4QztBQWhEWSxvRUFBNEIifQ==