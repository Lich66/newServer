import { Model } from 'sequelize-typescript';
export interface IClub_requser {
    rid: number,
    clubid: number,
    userid: number,
    req_time: Date,
}


export interface ITbl_club_requser extends Model<ITbl_club_requser>,IClub_requser{
    
}
