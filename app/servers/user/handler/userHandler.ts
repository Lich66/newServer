import { Application, FrontendSession } from 'pinus';
import { IUserinfo } from '../../../interface/user/handler/userInterface';
import { Login } from '../../../controller/user/login';

export default function (app: Application) {
    return new Handler(app);
}

export class Handler {
    constructor(private app: Application) {

    }

    /**
     * user login
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     * @param  {Function} next    next step callback
     * @return {Void}
     */
    async auth(userinfo: IUserinfo) {
        // console.log(JSON.stringify(userinfo));
        let result = await Login.login(userinfo);
        return result;
    }

}