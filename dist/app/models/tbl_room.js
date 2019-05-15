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
const BIGINT20 = 20;
const STRING64 = 64;
const STRING32 = 32;
const STRING2048 = 2048;
const STRING512 = 512;
let tbl_room = 
// tslint:disable-next-line: class-name
class tbl_room extends sequelize_typescript_1.Model {
    static makeUpperCase(instance) {
        // this will be called when an instance is created or updated
        instance.create_time = new Date();
    }
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.BIGINT(BIGINT20),
        comment: 'roomid'
    }),
    __metadata("design:type", Number)
], tbl_room.prototype, "roomid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '茶楼id'
    }),
    __metadata("design:type", Number)
], tbl_room.prototype, "clubid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: 'TIMESTAMP',
        comment: '房间创建时间'
    }),
    __metadata("design:type", Date)
], tbl_room.prototype, "create_time", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING64),
        comment: '拥有者'
    }),
    __metadata("design:type", String)
], tbl_room.prototype, "owner", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '玩法'
    }),
    __metadata("design:type", Number)
], tbl_room.prototype, "play_type", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '底分'
    }),
    __metadata("design:type", Number)
], tbl_room.prototype, "base_point", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '桌子坐的人数'
    }),
    __metadata("design:type", Number)
], tbl_room.prototype, "player_num", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '局数'
    }),
    __metadata("design:type", Number)
], tbl_room.prototype, "round", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '房费类型'
    }),
    __metadata("design:type", Number)
], tbl_room.prototype, "room_pay", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '开始选项'
    }),
    __metadata("design:type", Number)
], tbl_room.prototype, "start_option", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '推注选项'
    }),
    __metadata("design:type", Boolean)
], tbl_room.prototype, "push_flag", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '最大抢庄'
    }),
    __metadata("design:type", Number)
], tbl_room.prototype, "max_grab", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '翻倍规则'
    }),
    __metadata("design:type", Number)
], tbl_room.prototype, "double_rule", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '特殊牌型'
    }),
    __metadata("design:type", Number)
], tbl_room.prototype, "special_card", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '快速模式标志位'
    }),
    __metadata("design:type", Boolean)
], tbl_room.prototype, "fast_flag", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '中途禁入标志'
    }),
    __metadata("design:type", Boolean)
], tbl_room.prototype, "half_way_add", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '搓牌标志'
    }),
    __metadata("design:type", Boolean)
], tbl_room.prototype, "rubbing_flag", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '道具禁用标志'
    }),
    __metadata("design:type", Boolean)
], tbl_room.prototype, "item_use", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '闲家买码'
    }),
    __metadata("design:type", Boolean)
], tbl_room.prototype, "buy_code", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '表情禁用'
    }),
    __metadata("design:type", Boolean)
], tbl_room.prototype, "emotion", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '暗抢庄家标志'
    }),
    __metadata("design:type", Boolean)
], tbl_room.prototype, "grab_flag", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '加倍标志'
    }),
    __metadata("design:type", Boolean)
], tbl_room.prototype, "double_flag", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '王赖玩法'
    }),
    __metadata("design:type", Number)
], tbl_room.prototype, "laizi_type", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tbl_room]),
    __metadata("design:returntype", void 0)
], tbl_room, "makeUpperCase", null);
tbl_room = __decorate([
    sequelize_typescript_1.Table
    // tslint:disable-next-line: class-name
], tbl_room);
exports.tbl_room = tbl_room;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX3Jvb20uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvbW9kZWxzL3RibF9yb29tLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0RBQStHO0FBRS9HLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQztBQUN4QixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUM7QUFHdEIsSUFBYSxRQUFRO0FBRHJCLHVDQUF1QztBQUN2QyxjQUFzQixTQUFRLDRCQUFlO0lBcUJsQyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQWtCO1FBQzFDLDZEQUE2RDtRQUM3RCxRQUFRLENBQUMsV0FBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDdEMsQ0FBQztDQXVHSixDQUFBO0FBdkhHO0lBTkMsb0NBQWE7SUFDYixpQ0FBVTtJQUNWLDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQy9CLE9BQU8sRUFBRSxRQUFRO0tBQ3BCLENBQUM7O3dDQUNvQjtBQUt0QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzt3Q0FDb0I7QUFNdEI7SUFKQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLFdBQVc7UUFDakIsT0FBTyxFQUFFLFFBQVE7S0FDcEIsQ0FBQzs4QkFDa0IsSUFBSTs2Q0FBQztBQVd6QjtJQUpDLDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQy9CLE9BQU8sRUFBRSxLQUFLO0tBQ2pCLENBQUM7O3VDQUNtQjtBQUtyQjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDOzsyQ0FDdUI7QUFLekI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLElBQUk7S0FDaEIsQ0FBQzs7NENBQ3dCO0FBSzFCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxRQUFRO0tBQ3BCLENBQUM7OzRDQUN3QjtBQUsxQjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDOzt1Q0FDbUI7QUFLckI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7MENBQ3NCO0FBS3hCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7OzhDQUMwQjtBQUs1QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzsyQ0FDd0I7QUFLMUI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7MENBQ3NCO0FBS3hCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7OzZDQUN5QjtBQUszQjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzs4Q0FDMEI7QUFLNUI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLFNBQVM7S0FDckIsQ0FBQzs7MkNBQ3dCO0FBSzFCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxRQUFRO0tBQ3BCLENBQUM7OzhDQUMyQjtBQUs3QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzs4Q0FDMkI7QUFLN0I7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLFFBQVE7S0FDcEIsQ0FBQzs7MENBQ3VCO0FBS3pCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7OzBDQUN1QjtBQUt6QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzt5Q0FDc0I7QUFLeEI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLFFBQVE7S0FDcEIsQ0FBQzs7MkNBQ3dCO0FBSzFCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7OzZDQUMwQjtBQUs1QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzs0Q0FDd0I7QUF4RzFCO0lBREMsbUNBQVk7O3FDQUN5QixRQUFROzttQ0FHN0M7QUF4QlEsUUFBUTtJQUZwQiw0QkFBSztJQUNOLHVDQUF1QztHQUMxQixRQUFRLENBK0hwQjtBQS9IWSw0QkFBUSJ9