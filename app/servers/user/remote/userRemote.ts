import { Application, RemoterClass, FrontendSession } from 'pinus';
// // import { IUserinfo, IAccountInfo, ITokenInfo, IAuthReturn } from '../../../interface/user/Remote/userInterface';
import { Login } from '../../../controller/account/login';
import { IUserinfoRequest, IAuthReturn, IAccountInfoRequest, ITokenInfoRequest, IUserResponse } from '../../../interface/user/remote/userInterface';

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
        if (userinfo.token) {
            json.token = userinfo.token;
        } else if (userinfo.wxopenid) {
            json.wxopenid = userinfo.wxopenid;
        } else if (userinfo.xlopenid) {
            json.xlopenid = userinfo.xlopenid;
        }
        return await Login.login(json);
       
    }

    /**
     * test login
     *
     * @param  {Object}   userinfo     request message
     * @return {object}
     */
    async accountLogin(userinfo: IAccountInfoRequest): Promise<IAuthReturn> {
        // console.log(JSON.stringify(userinfo));
        let result = await Login.accountLogin(userinfo);
        if(result){
            return {
                code: 200,
                data: result,
                // msg: `${result[1]}`
            };
        }else{
            return {
                code: 500,
                // data: result,
                msg: `账号密码不符合`
            };
        }
    }

    /**
     * token login
     *
     * @param  {Object}   userinfo     request message
     * @return {object}
     */
    async tokenLogin(userinfo: ITokenInfoRequest): Promise<IAuthReturn> {
        // console.log(JSON.stringify(userinfo));
        let result = await Login.tokenLogin(userinfo);
        if (result) {
            return {
                code: 200,
                data: result,
                msg: `登陆成功`
            };
        } else {
            return {
                code: 500,
                msg: '用户不存在'
            };
        }

    }

}