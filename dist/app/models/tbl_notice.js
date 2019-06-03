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
const STRING1024 = 1024;
const STRING64 = 64;
const STRING32 = 32;
let tbl_notice = 
// tslint:disable-next-line: class-name
class tbl_notice extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column({
        comment: '公告id'
    }),
    __metadata("design:type", Number)
], tbl_notice.prototype, "index", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING32),
        comment: '公告类型'
    }),
    __metadata("design:type", String)
], tbl_notice.prototype, "notice_type", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING64),
        comment: '公告标题'
    }),
    __metadata("design:type", String)
], tbl_notice.prototype, "notice_title", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '公告起始时间'
    }),
    __metadata("design:type", Date)
], tbl_notice.prototype, "notice_start_time", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: '公告结束时间'
    }),
    __metadata("design:type", Date)
], tbl_notice.prototype, "notice_end_time", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING1024),
        comment: '公告内容'
    }),
    __metadata("design:type", String)
], tbl_notice.prototype, "value", void 0);
tbl_notice = __decorate([
    sequelize_typescript_1.Table({ timestamps: false })
    // tslint:disable-next-line: class-name
], tbl_notice);
exports.tbl_notice = tbl_notice;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX25vdGljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvdGJsX25vdGljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLCtEQUFrRjtBQUVsRixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDeEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUlwQixJQUFhLFVBQVU7QUFEdkIsdUNBQXVDO0FBQ3ZDLE1BQWEsVUFBVyxTQUFRLDRCQUFpQjtDQW1DaEQsQ0FBQTtBQTlCRztJQUpDLGlDQUFVO0lBQ1YsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7O3lDQUNtQjtBQU1yQjtJQUpDLDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQy9CLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7OytDQUN5QjtBQU0zQjtJQUpDLDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQy9CLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7O2dEQUMwQjtBQUs1QjtJQUhDLDZCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsUUFBUTtLQUNwQixDQUFDOzhCQUN3QixJQUFJO3FEQUFDO0FBSy9CO0lBSEMsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxRQUFRO0tBQ3BCLENBQUM7OEJBQ3NCLElBQUk7bURBQUM7QUFNN0I7SUFKQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNqQyxPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzt5Q0FDbUI7QUFqQ1osVUFBVTtJQUZ0Qiw0QkFBSyxDQUFDLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQzdCLHVDQUF1QztHQUMxQixVQUFVLENBbUN0QjtBQW5DWSxnQ0FBVSJ9