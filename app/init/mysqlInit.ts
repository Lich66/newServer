
import { sequelize } from '../db/sequelize';
import { ITbl_account } from '../interface/models/tbl_account';
import { ITbl_user } from '../interface/models/tbl_user';
import { tbl_account } from '../models/tbl_account';
import { tbl_user } from '../models/tbl_user';

const testAccount = 500;
async function start() {
    await sequelize.sync({ force: true });

    for (let index = 0; index < testAccount; index++) {
        sequelize.transaction(async (t) => {
            const account = await tbl_account.create<ITbl_account>({}, { transaction: t });
            const userModel = await tbl_user.create<ITbl_user>({userid: account.uid}, { transaction: t });
        });
    }
}
start();
