import { DataBaseFields } from '../../gameConfig/dataBaseFields';
import { Bullfight_BaseDB } from '../../models/Bullfight_BaseDB';

export class Base {
    public static async getdefaultDiamond(): Promise<number> {
        const diamondRow = await Bullfight_BaseDB.findOne({ where: { key: DataBaseFields.PlayerStartGemsNum } });
        console.log('getdefaultDiamondgetdefaultDiamondgetdefaultDiamondgetdefaultDiamondgetdefaultDiamond');
        console.log(diamondRow.toJSON());
        console.log(JSON.stringify(diamondRow.toJSON()));
        return Number.parseInt(diamondRow.Value, 0);
    }

    public static async getDefaultClubName(): Promise<[string, string]> {
        const CreateClubStartNameRow = await Bullfight_BaseDB.findOne({ where: { key: DataBaseFields.CreateClubStartName } });
        const CreateClubMatchStartNameRow = await Bullfight_BaseDB.findOne({ where: { key: DataBaseFields.CreateClubMatchStartName } });
        return [CreateClubStartNameRow.Value, CreateClubMatchStartNameRow.Value];
    }

    public static async getDefaultValueByKey(json: { key: string }) {
        let result = await Bullfight_BaseDB.findOne({ where: { Key: json.key } });
        if (!!result) {
            return result.Value;
        }
        return false;
    }
}
