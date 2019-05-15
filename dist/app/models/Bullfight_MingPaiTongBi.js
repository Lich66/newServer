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
let Bullfight_MingPaiTongBi = 
// tslint:disable-next-line: class-name
class Bullfight_MingPaiTongBi extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiTongBi.prototype, "index", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiTongBi.prototype, "GameType", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiTongBi.prototype, "GamePlay", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiTongBi.prototype, "OpenDeskNum", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiTongBi.prototype, "BottomPouring", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiTongBi.prototype, "SetQuotient", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiTongBi.prototype, "RoomPayMode", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiTongBi.prototype, "RoomPayCost", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiTongBi.prototype, "StartGameMode", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiTongBi.prototype, "TongBiMode", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiTongBi.prototype, "DoubleRule", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiTongBi.prototype, "SpecialDoubleRule", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiTongBi.prototype, "HighLevelChoose", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_MingPaiTongBi.prototype, "WangLaiMode", void 0);
Bullfight_MingPaiTongBi = __decorate([
    sequelize_typescript_1.Table
    // tslint:disable-next-line: class-name
], Bullfight_MingPaiTongBi);
exports.Bullfight_MingPaiTongBi = Bullfight_MingPaiTongBi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnVsbGZpZ2h0X01pbmdQYWlUb25nQmkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvbW9kZWxzL0J1bGxmaWdodF9NaW5nUGFpVG9uZ0JpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0RBQXdFO0FBSXhFLElBQWEsdUJBQXVCO0FBRHBDLHVDQUF1QztBQUN2Qyw2QkFBcUMsU0FBUSw0QkFBOEI7Q0E2QzFFLENBQUE7QUF6Q0M7SUFGQyxpQ0FBVTtJQUNWLDZCQUFNOztzREFDYztBQUdyQjtJQURDLDZCQUFNOzt5REFDaUI7QUFHeEI7SUFEQyw2QkFBTTs7eURBQ2lCO0FBR3hCO0lBREMsNkJBQU07OzREQUNvQjtBQUczQjtJQURDLDZCQUFNOzs4REFDc0I7QUFHN0I7SUFEQyw2QkFBTTs7NERBQ29CO0FBRzNCO0lBREMsNkJBQU07OzREQUNvQjtBQUczQjtJQURDLDZCQUFNOzs0REFDb0I7QUFHM0I7SUFEQyw2QkFBTTs7OERBQ3NCO0FBRzdCO0lBREMsNkJBQU07OzJEQUNtQjtBQUcxQjtJQURDLDZCQUFNOzsyREFDbUI7QUFHMUI7SUFEQyw2QkFBTTs7a0VBQzBCO0FBR2pDO0lBREMsNkJBQU07O2dFQUN3QjtBQUcvQjtJQURDLDZCQUFNOzs0REFDb0I7QUEzQ2hCLHVCQUF1QjtJQUZuQyw0QkFBSztJQUNOLHVDQUF1QztHQUMxQix1QkFBdUIsQ0E2Q25DO0FBN0NZLDBEQUF1QiJ9