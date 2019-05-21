import { Application, FrontendSession, RemoterClass } from 'pinus';
import { Login } from '../../../controller/account/login';
import { IAccountInfoRequest, ITokenInfoRequest, IUserinfoRequest, IUserResponse } from '../../../interface/user/userInterface';

export default function (app: Application) {
    return new Remote(app);
}
declare global {
    interface UserRpc {
        user: {
            userRemote: RemoterClass<FrontendSession, Remote>;
        };
    }
}

export class Remote {
    public constructor(private app: Application) {

    }

    public async auth(userinfo: IUserinfoRequest): Promise<IUserResponse> {
        return await Login.login(userinfo);

    }

   
    public async accountLogin(userinfo: IAccountInfoRequest): Promise<IUserResponse> {
        // console.log(JSON.stringify(userinfo));
        return await Login.accountLogin(userinfo);

    }

 
    public async tokenLogin(userinfo: ITokenInfoRequest): Promise<IUserResponse> {
        // console.log(JSON.stringify(userinfo));
        return await Login.tokenLogin(userinfo);

    }

}
