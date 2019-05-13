import { IResponse } from "../../global/response";
export interface IClubRequest {
    houseid?: number,
    uid?: string,
    name?: string,
    notice?: string,
    play_setting?: string,
    type?: number,
    create_time?: Date,
    open_flag?: boolean,
    pay_flag?: boolean,
    audit_flag?: boolean,
    integral_flag?: boolean,
    privacy_flag?: boolean,
    end_points?: number,
    join_points?: number,
    point_setflag?: boolean,
    point_adjustflag?: boolean,
    point_permission?: number,
    present_target?: number,
    present_times?: number,
    present_points?: number,
    clubConfig?: number[][]
}

export interface IClubReturn extends IResponse {
    data?: IClubRequest | IClubRequest[] | number|[number,IClubRequest[]];
}
