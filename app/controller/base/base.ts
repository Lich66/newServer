import { Bullfight_BaseDB } from '../../models/Bullfight_BaseDB';

export class Base {
    public static async getdefaultDiamond(): Promise<number> {
        const diamondRow = await Bullfight_BaseDB.findOne({ where: { key: 'PlayerStartGemsNum' } });
        console.log('getdefaultDiamondgetdefaultDiamondgetdefaultDiamondgetdefaultDiamondgetdefaultDiamond');
        console.log(diamondRow.toJSON());
        console.log(JSON.stringify(diamondRow.toJSON()));
        return Number.parseInt(diamondRow.Value, 0);
    }

    public static async getDefaultClubName(): Promise<[string, string]> {
        const CreateClubStartNameRow = await Bullfight_BaseDB.findOne({ where: { key: 'CreateClubStartName' } });
        const CreateClubMatchStartNameRow = await Bullfight_BaseDB.findOne({ where: { key: 'CreateClubMatchStartName' } });
        return [CreateClubStartNameRow.Value, CreateClubMatchStartNameRow.Value];
    }
}
