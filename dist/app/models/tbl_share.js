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
const STRING64 = 64;
const STRING512 = 512;
let tbl_share = 
// tslint:disable-next-line: class-name
class tbl_share extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column({
        comment: '分享数据id'
    }),
    __metadata("design:type", Number)
], tbl_share.prototype, "share_id", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING512),
        comment: '二维码图片数据'
    }),
    __metadata("design:type", String)
], tbl_share.prototype, "photo_url", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING64),
        comment: '图片位置'
    }),
    __metadata("design:type", String)
], tbl_share.prototype, "photo_position", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING64),
        comment: '图片大小'
    }),
    __metadata("design:type", String)
], tbl_share.prototype, "photo_size", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(STRING64),
        comment: '邀请码位置'
    }),
    __metadata("design:type", String)
], tbl_share.prototype, "code_position", void 0);
tbl_share = __decorate([
    sequelize_typescript_1.Table({ timestamps: false })
    // tslint:disable-next-line: class-name
], tbl_share);
exports.tbl_share = tbl_share;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJsX3NoYXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL21vZGVscy90Ymxfc2hhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwrREFBa0Y7QUFFbEYsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQztBQUl0QixJQUFhLFNBQVM7QUFEdEIsdUNBQXVDO0FBQ3ZDLE1BQWEsU0FBVSxTQUFRLDRCQUFnQjtDQWdDOUMsQ0FBQTtBQTNCRztJQUpDLGlDQUFVO0lBQ1YsNkJBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxRQUFRO0tBQ3BCLENBQUM7OzJDQUNzQjtBQU14QjtJQUpDLDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ2hDLE9BQU8sRUFBRSxTQUFTO0tBQ3JCLENBQUM7OzRDQUN1QjtBQU16QjtJQUpDLDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQy9CLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7O2lEQUM0QjtBQU05QjtJQUpDLDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQy9CLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7OzZDQUN3QjtBQU0xQjtJQUpDLDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQy9CLE9BQU8sRUFBRSxPQUFPO0tBQ25CLENBQUM7O2dEQUMyQjtBQTdCcEIsU0FBUztJQUZyQiw0QkFBSyxDQUFDLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQzdCLHVDQUF1QztHQUMxQixTQUFTLENBZ0NyQjtBQWhDWSw4QkFBUyJ9