import { ChannelService } from 'pinus';
export class HouseChannelService {
    private channelService: ChannelService;
    private parms: { [key: string]: any };
    constructor(channelService: ChannelService) {
        this.channelService = channelService;
    }
    getChannel(parm: string, bool: boolean) {
        return this.channelService.getChannel(parm, bool)
    }
    set(key: string, value: any) {
        this.parms[key] = value;
    }
    get(key: string) {
        return this.parms[key]
    }
}