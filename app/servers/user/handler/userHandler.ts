import { Application, BackendSession } from 'pinus';
// import { IUserinfo, IAccountInfo, ITokenInfo, IAuthReturn } from '../../../interface/user/handler/userInterface';
import { Login } from '../../../controller/account/login';
import { IUserinfoRequest, IAuthReturn, IAccountInfoRequest, ITokenInfoRequest } from '../../../interface/user/handler/userInterface';

export default function (app: Application) {
    return new Handler(app);
}

export class Handler {
    constructor(private app: Application) {

    }

    /**
     * user login
     *
     * @param  {Object}   userinfo     request message
     * @return {object}
     */
    async auth(userinfo: IUserinfoRequest): Promise<IAuthReturn> {
        let json: IUserinfoRequest = {};
        if (userinfo.token) {
            json.token = userinfo.token;
        } else if (userinfo.wxopenid) {
            json.wxopenid = userinfo.wxopenid;
        } else if (userinfo.xlopenid) {
            json.xlopenid = userinfo.xlopenid;
        }
        let result = await Login.login(json);
        if (result) {
            return {
                code: 200,
                data: result,
                // msg: `${result[1]}`
            };
        } else {
            return {
                code: 500,
                // data: result,
                msg: `服务错了`
            };
        }

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
        return {
            code: 0,
            data: result,
        };
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
        if (result.token) {
            return {
                code: 0,
                data: result,
                msg: `登陆成功`
            };
        } else {
            return {
                code: 0,
                msg: '用户不存在'
            };
        }

    }

}