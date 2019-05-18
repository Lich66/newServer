import { IResponse } from '../../global/response';

export interface IRequest {
    clientVer: string;
    platform: string;
    deviceId: string;
    // [key: string]: string;
}

export interface IData {
    host: string;
    port: number;
    // [key: string]: any;
}
export interface IEntryReturn extends IResponse {
    data?: IData;
    // [key: string]: any;
}
