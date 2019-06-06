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
let Bullfight_Shop = 
// tslint:disable-next-line: class-name
class Bullfight_Shop extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_Shop.prototype, "index", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_Shop.prototype, "ViewOrder", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_Shop.prototype, "Name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_Shop.prototype, "PayType", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_Shop.prototype, "Money", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_Shop.prototype, "Diamond", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_Shop.prototype, "Extra", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_Shop.prototype, "BuyNum", void 0);
Bullfight_Shop = __decorate([
    sequelize_typescript_1.Table({ timestamps: false })
    // tslint:disable-next-line: class-name
], Bullfight_Shop);
exports.Bullfight_Shop = Bullfight_Shop;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnVsbGZpZ2h0X1Nob3AuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvbW9kZWxzL0J1bGxmaWdodF9TaG9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0RBQWtGO0FBSWxGLElBQWEsY0FBYztBQUQzQix1Q0FBdUM7QUFDdkMsTUFBYSxjQUFlLFNBQVEsNEJBQXFCO0NBMEJ4RCxDQUFBO0FBdkJHO0lBREMsNkJBQU07OzZDQUNjO0FBR3JCO0lBREMsNkJBQU07O2lEQUNrQjtBQUd6QjtJQURDLDZCQUFNOzs0Q0FDYTtBQUdwQjtJQURDLDZCQUFNOzsrQ0FDZ0I7QUFHdkI7SUFEQyw2QkFBTTs7NkNBQ2M7QUFHckI7SUFEQyw2QkFBTTs7K0NBQ2dCO0FBR3ZCO0lBREMsNkJBQU07OzZDQUNjO0FBR3JCO0lBREMsNkJBQU07OzhDQUNlO0FBeEJiLGNBQWM7SUFGMUIsNEJBQUssQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUM3Qix1Q0FBdUM7R0FDMUIsY0FBYyxDQTBCMUI7QUExQlksd0NBQWMifQ==