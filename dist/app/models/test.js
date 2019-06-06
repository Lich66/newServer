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
let test = 
// tslint:disable-next-line: class-name
class test extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column({
        comment: '第1张'
    }),
    __metadata("design:type", String)
], test.prototype, "p1", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '第2张'
    }),
    __metadata("design:type", String)
], test.prototype, "p2", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '第3张'
    }),
    __metadata("design:type", String)
], test.prototype, "p3", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '第4张'
    }),
    __metadata("design:type", String)
], test.prototype, "p4", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '第5张'
    }),
    __metadata("design:type", String)
], test.prototype, "p5", void 0);
test = __decorate([
    sequelize_typescript_1.Table({ timestamps: false })
    // tslint:disable-next-line: class-name
], test);
exports.test = test;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLCtEQUF3RTtBQUl4RSxJQUFhLElBQUk7QUFEakIsdUNBQXVDO0FBQ3ZDLE1BQWEsSUFBSyxTQUFRLDRCQUFXO0NBNEJwQyxDQUFBO0FBdkJHO0lBSkMsaUNBQVU7SUFDViw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLEtBQUs7S0FDakIsQ0FBQzs7Z0NBQ2dCO0FBS2xCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxLQUFLO0tBQ2pCLENBQUM7O2dDQUNnQjtBQUtsQjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsS0FBSztLQUNqQixDQUFDOztnQ0FDZ0I7QUFLbEI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLEtBQUs7S0FDakIsQ0FBQzs7Z0NBQ2dCO0FBS2xCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxLQUFLO0tBQ2pCLENBQUM7O2dDQUNnQjtBQXpCVCxJQUFJO0lBRmhCLDRCQUFLLENBQUMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDN0IsdUNBQXVDO0dBQzFCLElBQUksQ0E0QmhCO0FBNUJZLG9CQUFJIn0=