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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX3JlcG9ydF9yb29tLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL21vZGVscy90YmxfcmVwb3J0X3Jvb20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwrREFBMkY7QUFFM0YsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDO0FBQ3RCLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQztBQUN0QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDeEIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDO0FBSXhCLElBQWEsZUFBZTtBQUQ1Qix1Q0FBdUM7QUFDdkMsTUFBYSxlQUFnQixTQUFRLDRCQUFzQjtDQWdHMUQsQ0FBQTtBQTNGRztJQUpDLGlDQUFVO0lBQ1YsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxPQUFPO0tBQ25CLENBQUM7O2lEQUNzQjtBQUt4QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzsrQ0FDb0I7QUFLdEI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7a0RBQ3VCO0FBS3pCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7OEJBQ2dCLElBQUk7a0RBQUM7QUFNdkI7SUFKQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNoQyxPQUFPLEVBQUUsUUFBUTtLQUNwQixDQUFDOzttREFDd0I7QUFLMUI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE9BQU87S0FDbkIsQ0FBQzs7OENBQ21CO0FBS3JCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSw4QkFBOEI7S0FDMUMsQ0FBQzs7aURBQ3NCO0FBTXhCO0lBSkMsNkJBQU0sQ0FBQztRQUNKLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDaEMsT0FBTyxFQUFFLFFBQVE7S0FDcEIsQ0FBQzs7bURBQ3dCO0FBTTFCO0lBSkMsNkJBQU0sQ0FBQztRQUNKLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDaEMsT0FBTyxFQUFFLFFBQVE7S0FDcEIsQ0FBQzs7cURBQzBCO0FBTTVCO0lBSkMsNkJBQU0sQ0FBQztRQUNKLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDakMsT0FBTyxFQUFFLFFBQVE7S0FDcEIsQ0FBQzs7c0RBQzJCO0FBTTdCO0lBSkMsNkJBQU0sQ0FBQztRQUNKLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDaEMsT0FBTyxFQUFFLFNBQVM7S0FDckIsQ0FBQzs7bURBQ3dCO0FBTTFCO0lBSkMsNkJBQU0sQ0FBQztRQUNKLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDaEMsT0FBTyxFQUFFLFFBQVE7S0FDcEIsQ0FBQzs7a0RBQ3VCO0FBTXpCO0lBSkMsNkJBQU0sQ0FBQztRQUNKLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDakMsT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7b0RBQ3lCO0FBTTNCO0lBSkMsNkJBQU0sQ0FBQztRQUNKLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDakMsT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7cURBQzBCO0FBSzVCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7OEJBQ2MsSUFBSTtnREFBQztBQU1yQjtJQUpDLDhCQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ1YsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxpQkFBaUI7S0FDN0IsQ0FBQzs7Z0RBQ3FCO0FBTXZCO0lBSkMsOEJBQU8sQ0FBQyxDQUFDLENBQUM7SUFDViw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLGlCQUFpQjtLQUM3QixDQUFDOzs4Q0FDbUI7QUEvRlosZUFBZTtJQUYzQiw0QkFBSyxDQUFDLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQzdCLHVDQUF1QztHQUMxQixlQUFlLENBZ0czQjtBQWhHWSwwQ0FBZSJ9