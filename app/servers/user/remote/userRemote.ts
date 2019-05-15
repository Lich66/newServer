import { Application, FrontendSession, RemoterClass } from 'pinus';
import { Login } from '../../../controller/account/login';
import { IAccountInfoRequest, ITokenInfoRequest, IUserinfoRequest, IUserResponse } from '../../../interface/user/remote/userInterface';

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
        let json: IUserinfoRequest = {};
        console.log('authauthauthauthauthauthauthauthauthauthauthauthauthauth');
        console.log(JSON.stringify(json));
        if (userinfo.token) {
            json.token = userinfo.token;
        } else if (userinfo.wxopenid) {
            json.wxopenid = userinfo.wxopenid;
        } else if (userinfo.xlopenid) {
            json.xlopenid = userinfo.xlopenid;
        }
        console.log(JSON.stringify(json));
        return await Login.login(json);

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
