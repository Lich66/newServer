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
let tbl_club = 
// tslint:disable-next-line: class-name
class tbl_club extends sequelize_typescript_1.Model {
    static makeUpperCase(instance) {
        // this will be called when an instance is created or updated
        instance.create_time = new Date();
    }
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AllowNull,
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.BIGINT(BIGINT20),
        comment: '茶楼id'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "clubid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '所属玩家'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "uid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING32),
        comment: '茶楼名字'
    }),
    __metadata("design:type", String)
], tbl_club.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING2048),
        comment: '茶楼公告'
    }),
    __metadata("design:type", String)
], tbl_club.prototype, "notice", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '玩法类型'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "play_type", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '开桌'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "player_num", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '底分'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "base_point", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '总回合数'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "round", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '支付方式'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "pay_type", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '开始方式'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "start_type", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '推注方式'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "bolus_type", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '最大抢庄倍数'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "max_banker_bet", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '翻倍规则'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "double_rule", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '通比玩法'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "all_contrast_play", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '轮庄玩法'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "take_turns_play", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '上庄玩法'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "up_banker_play", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '特殊牌型'
    }),
    __metadata("design:type", String)
], tbl_club.prototype, "special_card", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '快速模式标志位'
    }),
    __metadata("design:type", Boolean)
], tbl_club.prototype, "fast_flag", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '中途禁入标志'
    }),
    __metadata("design:type", Boolean)
], tbl_club.prototype, "half_way_add", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '搓牌标志'
    }),
    __metadata("design:type", Boolean)
], tbl_club.prototype, "rubbing_flag", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '道具禁用标志'
    }),
    __metadata("design:type", Boolean)
], tbl_club.prototype, "item_use", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '闲家买码'
    }),
    __metadata("design:type", Boolean)
], tbl_club.prototype, "buy_code", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '推注限制'
    }),
    __metadata("design:type", Boolean)
], tbl_club.prototype, "bolus_limit", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '暗抢庄家标志'
    }),
    __metadata("design:type", Boolean)
], tbl_club.prototype, "grab_flag", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '加倍标志'
    }),
    __metadata("design:type", Boolean)
], tbl_club.prototype, "double_flag", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '王癞玩法'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "laizi_type", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '茶楼类型,普通还是比赛'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "type", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '茶楼创建时间'
    }),
    __metadata("design:type", Date)
], tbl_club.prototype, "create_time", void 0);
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column({
        comment: '审核开关'
    }),
    __metadata("design:type", Boolean)
], tbl_club.prototype, "audit_flag", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '积分是否可查看标识'
    }),
    __metadata("design:type", Boolean)
], tbl_club.prototype, "integral_flag", void 0);
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column({
        comment: '打烊标志'
    }),
    __metadata("design:type", Boolean)
], tbl_club.prototype, "open_flag", void 0);
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column({
        comment: '隐私标志'
    }),
    __metadata("design:type", Boolean)
], tbl_club.prototype, "privacy_flag", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '非aa支付开关'
    }),
    __metadata("design:type", Boolean)
], tbl_club.prototype, "pay_flag", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '参加分数'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "join_points", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '参加抢庄分数'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "join_rob_banker", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '负分设置'
    }),
    __metadata("design:type", Boolean)
], tbl_club.prototype, "point_setflag", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '积分调整选项'
    }),
    __metadata("design:type", Boolean)
], tbl_club.prototype, "point_adjustflag", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '积分权限类型'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "point_permission", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '表情赠送对象'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "present_target", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '表情赠送次数'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "present_times", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '赠送积分'
    }),
    __metadata("design:type", Number)
], tbl_club.prototype, "present_points", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tbl_club]),
    __metadata("design:returntype", void 0)
], tbl_club, "makeUpperCase", null);
tbl_club = __decorate([
    sequelize_typescript_1.Table({ timestamps: false })
    // tslint:disable-next-line: class-name
], tbl_club);
exports.tbl_club = tbl_club;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX2NsdWIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvbW9kZWxzL3RibF9jbHViLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0RBQW1JO0FBRW5JLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQztBQUN0QixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQztBQUN4QixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUM7QUFHdEIsSUFBYSxRQUFRO0FBRHJCLHVDQUF1QztBQUN2QyxNQUFhLFFBQVMsU0FBUSw0QkFBZTtJQW9KbEMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFrQjtRQUMxQyw2REFBNkQ7UUFDN0QsUUFBUSxDQUFDLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ3RDLENBQUM7Q0EwRUosQ0FBQTtBQXhORztJQVBDLG9DQUFhO0lBQ2IsaUNBQVU7SUFDVixnQ0FBUztJQUNULDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQy9CLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7O3dDQUNvQjtBQUt0QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOztxQ0FDaUI7QUFNbkI7SUFKQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUMvQixPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOztzQ0FDa0I7QUFNcEI7SUFKQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNqQyxPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzt3Q0FDb0I7QUFLdEI7SUFIQyw2QkFB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