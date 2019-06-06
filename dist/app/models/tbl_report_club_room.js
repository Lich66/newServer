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
const STRING128 = 128;
const STRING256 = 256;
const STRING1024 = 1024;
const STRING2048 = 2048;
let tbl_report_room = 
// tslint:disable-next-line: class-name
class tbl_report_room extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column({
        comment: '战绩表id'
    }),
    __metadata("design:type", Number)
], tbl_report_room.prototype, "reportid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '茶楼id'
    }),
    __metadata("design:type", Number)
], tbl_report_room.prototype, "clubid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '房间id'
    }),
    __metadata("design:type", Number)
], tbl_report_room.prototype, "roomid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '房主id'
    }),
    __metadata("design:type", Number)
], tbl_report_room.prototype, "creatorid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '开始时间'
    }),
    __metadata("design:type", Date)
], tbl_report_room.prototype, "starttime", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING128),
        comment: '房间配置信息'
    }),
    __metadata("design:type", String)
], tbl_report_room.prototype, "roomconfig", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '对局回合数'
    }),
    __metadata("design:type", Number)
], tbl_report_room.prototype, "round", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '房间类型(茶楼:[比赛场:2,休闲场:1],普通场:0)'
    }),
    __metadata("design:type", Number)
], tbl_report_room.prototype, "roomtype", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING128),
        comment: '玩家id列表'
    }),
    __metadata("design:type", String)
], tbl_report_room.prototype, "useridlist", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING256),
        comment: '玩家昵称列表'
    }),
    __metadata("design:type", String)
], tbl_report_room.prototype, "usernicklist", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING2048),
        comment: '玩家头像列表'
    }),
    __metadata("design:type", String)
], tbl_report_room.prototype, "userimagelist", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING128),
        comment: '大赢家id列表'
    }),
    __metadata("design:type", String)
], tbl_report_room.prototype, "winnerlist", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING128),
        comment: '土豪id列表'
    }),
    __metadata("design:type", String)
], tbl_report_room.prototype, "loserlist", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING1024),
        comment: '最终战绩'
    }),
    __metadata("design:type", String)
], tbl_report_room.prototype, "finalreport", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING2048),
        comment: '详细战绩'
    }),
    __metadata("design:type", String)
], tbl_report_room.prototype, "detailreport", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '结束时间'
    }),
    __metadata("design:type", Date)
], tbl_report_room.prototype, "endtime", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column({
        comment: '结束类型(正常:0,解散:1)'
    }),
    __metadata("design:type", Number)
], tbl_report_room.prototype, "endtype", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column({
        comment: '战绩状态(正常:0,删除:1)'
    }),
    __metadata("design:type", Number)
], tbl_report_room.prototype, "state", void 0);
tbl_report_room = __decorate([
    sequelize_typescript_1.Table({ timestamps: false })
    // tslint:disable-next-line: class-name
], tbl_report_room);
exports.tbl_report_room = tbl_report_room;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX3JlcG9ydF9jbHViX3Jvb20uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvbW9kZWxzL3RibF9yZXBvcnRfY2x1Yl9yb29tLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0RBQTJGO0FBRTNGLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQztBQUN0QixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUM7QUFDdEIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDO0FBQ3hCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQztBQUl4QixJQUFhLGVBQWU7QUFENUIsdUNBQXVDO0FBQ3ZDLE1BQWEsZUFBZ0IsU0FBUSw0QkFBc0I7Q0FxRzFELENBQUE7QUFoR0c7SUFKQyxpQ0FBVTtJQUNWLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsT0FBTztLQUNuQixDQUFDOztpREFDc0I7QUFLeEI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7K0NBQ29CO0FBS3RCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7OytDQUNvQjtBQUt0QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOztrREFDdUI7QUFLekI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs4QkFDZ0IsSUFBSTtrREFBQztBQU12QjtJQUpDLDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ2hDLE9BQU8sRUFBRSxRQUFRO0tBQ3BCLENBQUM7O21EQUN3QjtBQUsxQjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsT0FBTztLQUNuQixDQUFDOzs4Q0FDbUI7QUFLckI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLDhCQUE4QjtLQUMxQyxDQUFDOztpREFDc0I7QUFNeEI7SUFKQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNoQyxPQUFPLEVBQUUsUUFBUTtLQUNwQixDQUFDOzttREFDd0I7QUFNMUI7SUFKQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNoQyxPQUFPLEVBQUUsUUFBUTtLQUNwQixDQUFDOztxREFDMEI7QUFNNUI7SUFKQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNqQyxPQUFPLEVBQUUsUUFBUTtLQUNwQixDQUFDOztzREFDMkI7QUFNN0I7SUFKQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNoQyxPQUFPLEVBQUUsU0FBUztLQUNyQixDQUFDOzttREFDd0I7QUFNMUI7SUFKQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNoQyxPQUFPLEVBQUUsUUFBUTtLQUNwQixDQUFDOztrREFDdUI7QUFNekI7SUFKQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNqQyxPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOztvREFDeUI7QUFNM0I7SUFKQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNqQyxPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOztxREFDMEI7QUFLNUI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs4QkFDYyxJQUFJO2dEQUFDO0FBTXJCO0lBSkMsOEJBQU8sQ0FBQyxDQUFDLENBQUM7SUFDViw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLGlCQUFpQjtLQUM3QixDQUFDOztnREFDcUI7QUFNdkI7SUFKQyw4QkFBTyxDQUFDLENBQUMsQ0FBQztJQUNWLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsaUJBQWlCO0tBQzdCLENBQUM7OzhDQUNtQjtBQXBHWixlQUFlO0lBRjNCLDRCQUFLLENBQUMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDN0IsdUNBQXVDO0dBQzFCLGVBQWUsQ0FxRzNCO0FBckdZLDBDQUFlIn0=