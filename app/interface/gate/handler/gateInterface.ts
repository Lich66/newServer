import { IResponse } from '../../global/response';

export interface IRequest {
    clientVer: string;
    platform: string;
    deviceId: string;
}

export interface IData {
    host: string;
    port: number;
}
export interface IEntryReturn extends IResponse {
    data?: IData;
}
