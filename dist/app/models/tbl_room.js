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
    sequelize_typescript_1.Table({ timestamps: false })
    // tslint:disable-next-line: class-name
], tbl_room);
exports.tbl_room = tbl_room;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX3Jvb20uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvbW9kZWxzL3RibF9yb29tLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0RBQStHO0FBRS9HLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQztBQUN0QixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQztBQUN4QixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUM7QUFHdEIsSUFBYSxRQUFRO0FBRHJCLHVDQUF1QztBQUN2QyxNQUFhLFFBQVMsU0FBUSw0QkFBZTtJQXFCbEMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFrQjtRQUMxQyw2REFBNkQ7UUFDN0QsUUFBUSxDQUFDLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ3RDLENBQUM7Q0F1R0osQ0FBQTtBQXZIRztJQU5DLG9DQUFhO0lBQ2IsaUNBQVU7SUFDViw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUMvQixPQUFPLEVBQUUsUUFBUTtLQUNwQixDQUFDOzt3Q0FDb0I7QUFLdEI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7d0NBQ29CO0FBTXRCO0lBSkMsNkJBQU0sQ0FBQztRQUNKLElBQUksRUFBRSxXQUFXO1FBQ2pCLE9BQU8sRUFBRSxRQUFRO0tBQ3BCLENBQUM7OEJBQ2tCLElBQUk7NkNBQUM7QUFXekI7SUFKQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUMvQixPQUFPLEVBQUUsS0FBSztLQUNqQixDQUFDOzt1Q0FDbUI7QUFLckI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLElBQUk7S0FDaEIsQ0FBQzs7MkNBQ3VCO0FBS3pCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUM7OzRDQUN3QjtBQUsxQjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsUUFBUTtLQUNwQixDQUFDOzs0Q0FDd0I7QUFLMUI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLElBQUk7S0FDaEIsQ0FBQzs7dUNBQ21CO0FBS3JCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7OzBDQUNzQjtBQUt4QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzs4Q0FDMEI7QUFLNUI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7MkNBQ3dCO0FBSzFCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7OzBDQUNzQjtBQUt4QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzs2Q0FDeUI7QUFLM0I7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7OENBQzBCO0FBSzVCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxTQUFTO0tBQ3JCLENBQUM7OzJDQUN3QjtBQUsxQjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsUUFBUTtLQUNwQixDQUFDOzs4Q0FDMkI7QUFLN0I7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7OENBQzJCO0FBSzdCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxRQUFRO0tBQ3BCLENBQUM7OzBDQUN1QjtBQUt6QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzswQ0FDdUI7QUFLekI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7eUNBQ3NCO0FBS3hCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxRQUFRO0tBQ3BCLENBQUM7OzJDQUN3QjtBQUsxQjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzs2Q0FDMEI7QUFLNUI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7NENBQ3dCO0FBeEcxQjtJQURDLG1DQUFZOztxQ0FDeUIsUUFBUTs7bUNBRzdDO0FBeEJRLFFBQVE7SUFGcEIsNEJBQUssQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUM3Qix1Q0FBdUM7R0FDMUIsUUFBUSxDQStIcEI7QUEvSFksNEJBQVEifQ==