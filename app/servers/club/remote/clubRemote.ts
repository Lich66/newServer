import { Application, FrontendSession, RemoterClass } from 'pinus';
import { GlobalChannelServiceStatus } from 'pinus-global-channel-status';

export default function (app: Application) {
    return new ClubRemote(app);
}

declare global {
    interface UserRpc {
        club: {
            clubRemote: RemoterClass<FrontendSession, ClubRemote>;
        };
    }
}

export class ClubRemote {
    private app: Application;
    private globalChannelStatus: GlobalChannelServiceStatus;
    public constructor(app: Application) {
        this.app = app;
        this.globalChannelStatus = app.get(GlobalChannelServiceStatus.PLUGIN_NAME);
    }

    public async createclub(userId: string, clubConfig: number[][]) {
        // let club = await this.clubManager.createclub(userId, clubConfig);
        // return { code: 200, data: { clubId: club.clubId } }
    }


}
