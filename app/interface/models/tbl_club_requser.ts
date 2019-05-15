import { Model } from 'sequelize-typescript';
// tslint:disable-next-line: class-name
export interface IClub_requser {
    rid: number;
    clubid: number;
    userid: number;
    req_time: Date;
}


// tslint:disable-next-line: class-name
export interface ITbl_club_requser extends Model<ITbl_club_requser>, IClub_requser {

}
