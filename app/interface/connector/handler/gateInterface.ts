import { IResponse } from "../../global/response";
export interface IData {
    host:string;
    port:number;
}
export interface IEntryReturn extends IResponse{
    data?:IData;
}