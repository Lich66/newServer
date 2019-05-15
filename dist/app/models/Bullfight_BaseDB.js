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
let Bullfight_BaseDB = 
// tslint:disable-next-line: class-name
class Bullfight_BaseDB extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_BaseDB.prototype, "index", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_BaseDB.prototype, "PlayerStartGemsNum", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_BaseDB.prototype, "RoomStartID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Bullfight_BaseDB.prototype, "ClubStartID", void 0);
Bullfight_BaseDB = __decorate([
    sequelize_typescript_1.Table
    // tslint:disable-next-line: class-name
], Bullfight_BaseDB);
exports.Bullfight_BaseDB = Bullfight_BaseDB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnVsbGZpZ2h0X0Jhc2VEQi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvQnVsbGZpZ2h0X0Jhc2VEQi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLCtEQUF3RTtBQUl4RSxJQUFhLGdCQUFnQjtBQUQ3Qix1Q0FBdUM7QUFDdkMsc0JBQThCLFNBQVEsNEJBQXVCO0NBZTVELENBQUE7QUFYQztJQUZDLGlDQUFVO0lBQ1YsNkJBQU07OytDQUNjO0FBR3JCO0lBREMsNkJBQU07OzREQUMyQjtBQUdsQztJQURDLDZCQUFNOztxREFDb0I7QUFHM0I7SUFEQyw2QkFBTTs7cURBQ29CO0FBYmhCLGdCQUFnQjtJQUY1Qiw0QkFBSztJQUNOLHVDQUF1QztHQUMxQixnQkFBZ0IsQ0FlNUI7QUFmWSw0Q0FBZ0IifQ==