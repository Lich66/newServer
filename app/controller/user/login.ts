import { ITbl_user } from '../../interface/models/tbl_user';
import { tbl_user } from '../../models/tbl_user';
export class Login {
    public static async login(json: ITbl_user): Promise<[tbl_user, boolean]> {
        // 因为表中没有id
        await tbl_user.removeAttribute('id');
        const userone: [tbl_user, boolean] = await tbl_user.findOrCreate({ where: json, defaults: json });
        if (userone === null) {
            return null;
        } else {
            return userone;
        }
    }
}
