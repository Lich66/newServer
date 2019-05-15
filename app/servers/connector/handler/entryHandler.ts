import { Application, FrontendSession } from 'pinus';
import { IUserinfoRequest, IAuthReturn, IAccountInfoRequest, ITokenInfoRequest } from '../../../interface/user/remote/userInterface';
import { redisClient } from '../../../db/redis';

export default function (app: Application) {
    return new Handler(app);
}

export class Handler {
    constructor(private app: Application) {

    }

    /**
     * New client entry.
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     * @param  {Function} next    next step callback
     * @return {Void}
     */
    async auth(userinfo: IUserinfoRequest, session: FrontendSession): Promise<IAuthReturn> {

        if (!userinfo.token && !userinfo.wxopenid && !userinfo.xlopenid) {
            return {
                code: 400,
                msg: '参数错误'
            }
        }
        const user = await this.app.rpc.user.userRemote.auth.route(session)(userinfo);
        if (!user) {
            return {
                code: 500,
                msg: '服务出错'
            };
        }
        const sessionService = this.app.get('sessionService');

        if (!!sessionService.getByUid(user.userid.toString())) {
            return {
                code: 500,
                msg: '用户已登录'
            };
        }
        await session.abind(user.userid.toString());
        session.set('usernick', user.usernick);
        session.push('usernick', () => {

        })
        await redisClient.set(`'user:'${user.userid}`, JSON.stringify(user));
        let xx = JSON.parse(await redisClient.getAsync(`'user:'${user.userid}`));
        console.log('=== xx === ' + typeof xx);
        console.log('=== xx === ' + JSON.stringify(xx));
        console.log('=== xx === ' + JSON.stringify(xx.userid));
        return {
            code: 200,
            data: user,
            msg: 'game server is ok.'
        };
    }
    /**
    * test login
    *
    * @param  {Object}   userinfo     request message
    * @return {object}
    */
    async accountLogin(userinfo: IAccountInfoRequest, session: FrontendSession): Promise<IAuthReturn> {
        const user = await this.app.rpc.user.userRemote.accountLogin.route(session)(userinfo)
        if (user) {
            return {
                code: 200,
                data: user,
                // msg: `${result[1]}`
            };
        } else {
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
    async tokenLogin(userinfo: ITokenInfoRequest, session: FrontendSession): Promise<IAuthReturn> {
        // console.log(JSON.stringify(userinfo));
        const user = await this.app.rpc.user.userRemote.tokenLogin.route(session)(userinfo)
        if (user) {
            return {
                code: 200,
                data: user,
                msg: `登陆成功`
            };
        } else {
            return {
                code: 500,
                msg: '用户不存在'
            };
        }

    }

    /**
     * Publish route for mqtt connector.
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     * @param  {Function} next    next step callback
     * @return {Void}
     */
    async publish(msg: any, session: FrontendSession) {
        let result = {
            topic: 'publish',
            payload: JSON.stringify({ code: 200, msg: 'publish message is ok.' })
        };
        return result;
    }

    /**
     * Subscribe route for mqtt connector.
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     * @param  {Function} next    next step callback
     * @return {Void}
     */
    async subscribe(msg: any, session: FrontendSession) {
        let result = {
            topic: 'subscribe',
            payload: JSON.stringify({ code: 200, msg: 'subscribe message is ok.' })
        };
        return result;
    }

}