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
const sequelize_1 = require("../db/sequelize");
let Bullfight_PlayTypeLists = 
// tslint:disable-next-line: class-name
class Bullfight_PlayTypeLists extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(sequelize_1.MAXVARCHA)
    }),
    __metadata("design:type", String)
], Bullfight_PlayTypeLists.prototype, "index", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_PlayTypeLists.prototype, "GameType", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_PlayTypeLists.prototype, "GamePlay", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_PlayTypeLists.prototype, "OpenDeskNum", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_PlayTypeLists.prototype, "BottomPouring", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_PlayTypeLists.prototype, "SetQuotient", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_PlayTypeLists.prototype, "RoomPayMode", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_PlayTypeLists.prototype, "RoomPayCost", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_PlayTypeLists.prototype, "StartGameMode", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_PlayTypeLists.prototype, "BolusChoose", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_PlayTypeLists.prototype, "MaximumBank", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_PlayTypeLists.prototype, "DoubleRule", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_PlayTypeLists.prototype, "SpecialDoubleRule", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_PlayTypeLists.prototype, "HighLevelChoose", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bullfight_PlayTypeLists.prototype, "WangLaiMode", void 0);
Bullfight_PlayTypeLists = __decorate([
    sequelize_typescript_1.Table({ timestamps: false })
    // tslint:disable-next-line: class-name
], Bullfight_PlayTypeLists);
exports.Bullfight_PlayTypeLists = Bullfight_PlayTypeLists;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnVsbGZpZ2h0X1BsYXlUeXBlTGlzdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvbW9kZWxzL0J1bGxmaWdodF9QbGF5VHlwZUxpc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0RBQWtGO0FBQ2xGLCtDQUE0QztBQUc1QyxJQUFhLHVCQUF1QjtBQURwQyx1Q0FBdUM7QUFDdkMsTUFBYSx1QkFBd0IsU0FBUSw0QkFBOEI7Q0FrRDFFLENBQUE7QUE1Q0M7SUFKQyxpQ0FBVTtJQUNWLDZCQUFNLENBQUM7UUFDTixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMscUJBQVMsQ0FBQztLQUNqQyxDQUFDOztzREFDbUI7QUFHckI7SUFEQyw2QkFBTTs7eURBQ2lCO0FBR3hCO0lBREMsNkJBQU07O3lEQUNpQjtBQUd4QjtJQURDLDZCQUFNOzs0REFDb0I7QUFHM0I7SUFEQyw2QkFBTTs7OERBQ3NCO0FBRzdCO0lBREMsNkJBQU07OzREQUNvQjtBQUczQjtJQURDLDZCQUFNOzs0REFDb0I7QUFHM0I7SUFEQyw2QkFBTTs7NERBQ29CO0FBRzNCO0lBREMsNkJBQU07OzhEQUNzQjtBQUc3QjtJQURDLDZCQUFNOzs0REFDb0I7QUFHM0I7SUFEQyw2QkFBTTs7NERBQ29CO0FBRzNCO0lBREMsNkJBQU07OzJEQUNtQjtBQUcxQjtJQURDLDZCQUFNOztrRUFDMEI7QUFHakM7SUFEQyw2QkFBTTs7Z0VBQ3dCO0FBRy9CO0lBREMsNkJBQU07OzREQUNvQjtBQWhEaEIsdUJBQXVCO0lBRm5DLDRCQUFLLENBQUMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDN0IsdUNBQXVDO0dBQzFCLHVCQUF1QixDQWtEbkM7QUFsRFksMERBQXVCIn0=