import { IRechargeRequest } from '../../interface/recharge/rechargeInterface';
import { Bullfight_Shop } from '../../models/Bullfight_Shop';
import { tbl_rechargelog } from '../../models/tbl_rechargelog';
import { tbl_user } from '../../models/tbl_user';
import { SelfUtils } from '../../util/selfUtils';



export class Recharge {

    public static async recharge(json: IRechargeRequest): Promise<number> {
        // {uid:x},{diamond:9}
        // 模拟延迟
        const bool = await SelfUtils.timeout();
        if (bool) {
            // 假的 理论上都是从sdk获取
            const length = 24;
            const oderid = await SelfUtils.createHash(length);
            const rechargetime = new Date();
            const money = 328;
            const pf = 'pf';

            const data = await Bullfight_Shop.findOne({ where: { Money: money } });
            const diamond = data.Diamond;
            const extra = data.Extra;
            await tbl_rechargelog.create<tbl_rechargelog>({
                oderid,
                userid: json.userid,
                money,
                diamond,
                extra,
                rechargetime,
                pf
            });
            let result = await tbl_user.update({ diamond: diamond + extra }, { where: { userid: json.userid } });
            return result[0];
        } else {
            return null;
        }

        // let result = await tbl_club.update(njson, { where: { ...ojson } });
    }

}
