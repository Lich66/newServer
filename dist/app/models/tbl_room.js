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
        instance.map((item) => {
            item.create_time = new Date();
        });
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
        comment: '房间创建时间'
    }),
    __metadata("design:type", Date)
], tbl_room.prototype, "create_time", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '玩法类型'
    }),
    __metadata("design:type", Number)
], tbl_room.prototype, "play_type", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '开桌'
    }),
    __metadata("design:type", Number)
], tbl_room.prototype, "player_num", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '底分'
    }),
    __metadata("design:type", Number)
], tbl_room.prototype, "base_point", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '总回合数'
    }),
    __metadata("design:type", Number)
], tbl_room.prototype, "round", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '支付方式'
    }),
    __metadata("design:type", Number)
], tbl_room.prototype, "pay_type", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '开始方式'
    }),
    __metadata("design:type", Number)
], tbl_room.prototype, "start_type", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '推注方式'
    }),
    __metadata("design:type", Number)
], tbl_room.prototype, "bolus_type", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '最大抢庄倍数'
    }),
    __metadata("design:type", Number)
], tbl_room.prototype, "max_banker_bet", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '翻倍规则'
    }),
    __metadata("design:type", Number)
], tbl_room.prototype, "double_rule", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '通比玩法'
    }),
    __metadata("design:type", Number)
], tbl_room.prototype, "all_contrast_play", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '轮庄玩法'
    }),
    __metadata("design:type", Number)
], tbl_room.prototype, "take_turns_play", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '上庄玩法'
    }),
    __metadata("design:type", Number)
], tbl_room.prototype, "up_banker_play", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '特殊牌型'
    }),
    __metadata("design:type", String)
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
        comment: '推注限制'
    }),
    __metadata("design:type", Boolean)
], tbl_room.prototype, "bolus_limit", void 0);
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
        comment: '王癞玩法'
    }),
    __metadata("design:type", Number)
], tbl_room.prototype, "laizi_type", void 0);
__decorate([
    sequelize_typescript_1.BeforeBulkCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], tbl_room, "makeUpperCase", null);
tbl_room = __decorate([
    sequelize_typescript_1.Table({ timestamps: false })
    // tslint:disable-next-line: class-name
], tbl_room);
exports.tbl_room = tbl_room;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX3Jvb20uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvbW9kZWxzL3RibF9yb29tLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0RBQW1IO0FBRW5ILE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQztBQUN0QixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQztBQUN4QixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUM7QUFHdEIsSUFBYSxRQUFRO0FBRHJCLHVDQUF1QztBQUN2QyxNQUFhLFFBQVMsU0FBUSw0QkFBZTtJQW9CbEMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFvQjtRQUM1Qyw2REFBNkQ7UUFDN0QsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FnSEosQ0FBQTtBQWpJRztJQU5DLG9DQUFhO0lBQ2IsaUNBQVU7SUFDViw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUMvQixPQUFPLEVBQUUsUUFBUTtLQUNwQixDQUFDOzt3Q0FDb0I7QUFLdEI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7d0NBQ29CO0FBS3RCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxRQUFRO0tBQ3BCLENBQUM7OEJBQ2tCLElBQUk7NkNBQUM7QUFZekI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7MkNBQ3VCO0FBS3pCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUM7OzRDQUN3QjtBQUsxQjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDOzs0Q0FDd0I7QUFLMUI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7dUNBQ21CO0FBS3JCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7OzBDQUNzQjtBQUt4QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzs0Q0FDd0I7QUFLMUI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7NENBQ3dCO0FBSzFCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxRQUFRO0tBQ3BCLENBQUM7O2dEQUM0QjtBQUs5QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzs2Q0FDeUI7QUFLM0I7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7bURBQytCO0FBS2pDO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7O2lEQUM2QjtBQUsvQjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOztnREFDNEI7QUFLOUI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7OENBQzBCO0FBSzVCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxTQUFTO0tBQ3JCLENBQUM7OzJDQUN3QjtBQUsxQjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsUUFBUTtLQUNwQixDQUFDOzs4Q0FDMkI7QUFLN0I7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7OENBQzJCO0FBSzdCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxRQUFRO0tBQ3BCLENBQUM7OzBDQUN1QjtBQUt6QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzswQ0FDdUI7QUFLekI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7NkNBQzBCO0FBSzVCO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxRQUFRO0tBQ3BCLENBQUM7OzJDQUN3QjtBQUsxQjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzs2Q0FDMEI7QUFLNUI7SUFIQyw2QkFBTSxDQUFDO1FBQ0osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQzs7NENBQ3dCO0FBbkgxQjtJQURDLHVDQUFnQjs7OzttQ0FNaEI7QUF6QlEsUUFBUTtJQUZwQiw0QkFBSyxDQUFDLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQzdCLHVDQUF1QztHQUMxQixRQUFRLENBeUlwQjtBQXpJWSw0QkFBUSJ9