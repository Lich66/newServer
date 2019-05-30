"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bullfight_BaseDB_1 = require("../../models/Bullfight_BaseDB");
class Base {
    static async getdefaultDiamond() {
        const diamondRow = await Bullfight_BaseDB_1.Bullfight_BaseDB.findOne({ where: { key: 'PlayerStartGemsNum' } });
        console.log('getdefaultDiamondgetdefaultDiamondgetdefaultDiamondgetdefaultDiamondgetdefaultDiamond');
        console.log(diamondRow.toJSON());
        console.log(JSON.stringify(diamondRow.toJSON()));
        return Number.parseInt(diamondRow.Value, 0);
    }
    static async getDefaultClubName() {
        const CreateClubStartNameRow = await Bullfight_BaseDB_1.Bullfight_BaseDB.findOne({ where: { key: 'CreateClubStartName' } });
        const CreateClubMatchStartNameRow = await Bullfight_BaseDB_1.Bullfight_BaseDB.findOne({ where: { key: 'CreateClubMatchStartName' } });
        return [CreateClubStartNameRow.Value, CreateClubMatchStartNameRow.Value];
    }
}
exports.Base = Base;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwcC9jb250cm9sbGVyL2Jhc2UvYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9FQUFpRTtBQUVqRSxNQUFhLElBQUk7SUFDTixNQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQjtRQUNqQyxNQUFNLFVBQVUsR0FBRyxNQUFNLG1DQUFnQixDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1RixPQUFPLENBQUMsR0FBRyxDQUFDLHVGQUF1RixDQUFDLENBQUM7UUFDckcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqRCxPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0I7UUFDbEMsTUFBTSxzQkFBc0IsR0FBRyxNQUFNLG1DQUFnQixDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxxQkFBcUIsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN6RyxNQUFNLDJCQUEyQixHQUFHLE1BQU0sbUNBQWdCLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLDBCQUEwQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25ILE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLEVBQUUsMkJBQTJCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0UsQ0FBQztDQUNKO0FBZEQsb0JBY0MifQ==