import { IResponse } from '../../global/response';
export interface IData {
    host: string;
    port: number;
    [key: string]: string | number;
}
export interface IEntryReturn extends IResponse {
    data?: IData;
    [key: string]: any;
}
