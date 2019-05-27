import { Application, FrontendSession } from 'pinus';
import { IEntryReturn, IRequest } from '../../../interface/gate/gateInterface';
import { dispatch } from '../../../util/dispatcher';

export default function (app: Application) {
    return new Handler(app);
}

export class Handler {
    private app: Application;
    public constructor(app: Application) {
        this.app = app;
    }

    public async queryEntry(request: IRequest, session: FrontendSession): Promise<IEntryReturn> {

        let connectors = this.app.getServersByType('connector');
        if (!connectors || connectors.length === 0) {
            return {
                code: 600
            };
        }
        // 这里有一段对比版本信息和入库谁被信息的代码

        // 这里写死了获取手机号 毕竟负载均衡都是假的，以后再改
        let res = dispatch(Math.random().toString(), connectors);
        return {
            code: 200,
            data: {
                host: res.host,
                port: res.clientPort
            }

        };
    }

    public async publish(msg: any, session: FrontendSession) {
        let result = {
            topic: 'publish',
            payload: JSON.stringify({ code: 200, msg: 'publish message is ok.' })
        };
        return result;
    }

    public async subscribe(msg: any, session: FrontendSession) {
        let result = {
            topic: 'subscribe',
            payload: JSON.stringify({ code: 200, msg: 'subscribe message is ok.' })
        };
        return result;
    }
}
