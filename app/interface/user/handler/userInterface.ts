import { Model } from "sequelize-typescript";

// import { IResponse } from "../../global/response";
export interface IUserinfo extends Model<IUserinfo> {
    username:string;
}
// export interface IEntryReturn extends IResponse{
//     data?:IData;
// }