import { Application, RemoterClass, FrontendSession } from 'pinus';
// // import { IUserinfo, IAccountInfo, ITokenInfo, IAuthReturn } from '../../../interface/user/Remote/userInterface';
import { Login } from '../../../controller/account/login';
import { IUserinfoRequest, IAccountInfoRequest, ITokenInfoRequest, IUserResponse } from '../../../interface/user/remote/userInterface';

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
    constructor(private app: Application) {

    }

    /**
     * user login
     *
     * @param  {Object}   userinfo     request message
     * @return {object}
     */
    async auth(userinfo: IUserinfoRequest): Promise<IUserResponse> {
        let json: IUserinfoRequest = {};
        console.log('authauthauthauthauthauthauthauthauthauthauthauthauthauth')
        console.log(JSON.stringify(json))
        if (userinfo.token) {
            json.token = userinfo.token;
        } else if (userinfo.wxopenid) {
            json.wxopenid = userinfo.wxopenid;
        } else if (userinfo.xlopenid) {
            json.xlopenid = userinfo.xlopenid;
        }
        console.log(JSON.stringify(json))
        return await Login.login(json);
       
    }

    /**
     * test login
     *
     * @param  {Object}   userinfo     request message
     * @return {object}
     */
    async accountLogin(userinfo: IAccountInfoRequest): Promise<IUserResponse> {
        // console.log(JSON.stringify(userinfo));
        return  await Login.accountLogin(userinfo);
        
    }

    /**
     * token login
     *
     * @param  {Object}   userinfo     request message
     * @return {object}
     */
    async tokenLogin(userinfo: ITokenInfoRequest): Promise<IUserResponse> {
        // console.log(JSON.stringify(userinfo));
        return await Login.tokenLogin(userinfo);

    }

}