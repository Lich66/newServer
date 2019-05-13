import { Application, FrontendSession } from 'pinus';
import { IUserinfoRequest, IAuthReturn } from '../../../interface/user/remote/userInterface';

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
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa')
        let user = await this.app.rpc.user.userRemote.auth.route(session)(userinfo);
        let sessionService = this.app.get('sessionService');
        if (!!sessionService.getByUid(user.userid.toString())) {
            return {
                code: 500,
                msg: '用户已登录'
            };
        }
        await session.abind(user.userid.toString());
        return {
            code: 200,
            data: user,
            msg: 'game server is ok.'
        };
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