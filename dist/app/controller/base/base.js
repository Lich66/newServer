"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataBaseFields_1 = require("../../gameConfig/dataBaseFields");
const Bullfight_BaseDB_1 = require("../../models/Bullfight_BaseDB");
class Base {
    static async getdefaultDiamond() {
        const diamondRow = await Bullfight_BaseDB_1.Bullfight_BaseDB.findOne({ where: { key: dataBaseFields_1.DataBaseFields.PlayerStartGemsNum } });
        console.log('getdefaultDiamondgetdefaultDiamondgetdefaultDiamondgetdefaultDiamondgetdefaultDiamond');
        console.log(diamondRow.toJSON());
        console.log(JSON.stringify(diamondRow.toJSON()));
        return Number.parseInt(diamondRow.Value, 0);
    }
    static async getDefaultClubName() {
        const CreateClubStartNameRow = await Bullfight_BaseDB_1.Bullfight_BaseDB.findOne({ where: { key: dataBaseFields_1.DataBaseFields.CreateClubStartName } });
        const CreateClubMatchStartNameRow = await Bullfight_BaseDB_1.Bullfight_BaseDB.findOne({ where: { key: dataBaseFields_1.DataBaseFields.CreateClubMatchStartName } });
        return [CreateClubStartNameRow.Value, CreateClubMatchStartNameRow.Value];
    }
    static async getDefaultValueByKey(json) {
        let result = await Bullfight_BaseDB_1.Bullfight_BaseDB.findOne({ where: { Key: json.key } });
        if (!!result) {
            return result.Value;
        }
        return false;
    }
}
exports.Base = Base;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwcC9jb250cm9sbGVyL2Jhc2UvYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9FQUFpRTtBQUNqRSxvRUFBaUU7QUFFakUsTUFBYSxJQUFJO0lBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUI7UUFDakMsTUFBTSxVQUFVLEdBQUcsTUFBTSxtQ0FBZ0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsK0JBQWMsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN6RyxPQUFPLENBQUMsR0FBRyxDQUFDLHVGQUF1RixDQUFDLENBQUM7UUFDckcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqRCxPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0I7UUFDbEMsTUFBTSxzQkFBc0IsR0FBRyxNQUFNLG1DQUFnQixDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSwrQkFBYyxDQUFDLG1CQUFtQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3RILE1BQU0sMkJBQTJCLEdBQUcsTUFBTSxtQ0FBZ0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsK0JBQWMsQ0FBQyx3QkFBd0IsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNoSSxPQUFPLENBQUMsc0JBQXNCLENBQUMsS0FBSyxFQUFFLDJCQUEyQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLElBQXFCO1FBQzFELElBQUksTUFBTSxHQUFHLE1BQU0sbUNBQWdCLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFO1lBQ1YsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ3ZCO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztDQUNKO0FBdEJELG9CQXNCQyJ9