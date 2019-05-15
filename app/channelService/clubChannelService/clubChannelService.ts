import { ChannelService } from 'pinus';
export class ClubChannelService {
    private channelService: ChannelService;
    private parms: { [key: string]: any };
    private constructor(channelService: ChannelService) {
        this.channelService = channelService;
    }
    public getChannel(parm: string, bool: boolean) {
        return this.channelService.getChannel(parm, bool);
    }
    public set(key: string, value: any) {
        this.parms[key] = value;
    }
    public get(key: string) {
        return this.parms[key];
    }
}
