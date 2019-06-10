import { IResponse } from '../global/response';
import { IClub } from '../models/tbl_club';

export interface IClubRequest {
    clubid?: number;
    uid?: number;
    name?: string;
    notice?: string;
    play_setting?: string;
    type?: number;
    create_time?: Date;
    open_flag?: boolean;
    pay_flag?: boolean;
    audit_flag?: boolean;
    integral_flag?: boolean;
    privacy_flag?: boolean;
    end_points?: number;
    join_points?: number;
    point_setflag?: boolean;
    point_adjustflag?: boolean;
    point_permission?: number;
    present_target?: number;
    present_times?: number;
    present_points?: number;
    clubConfig?: number[][];
    config_str?: string;
}

export interface IClubReturn extends IResponse {
    data?: IClub | IClub[] | number | [number, IClub[]];
}

export interface IClubRpc {
    uid?: number;
    sid?: string;
    clubid?: number;
    flag?: boolean;
}

export interface IClubReturn extends IResponse {
    data?: IClub | IClub[] | number | [number, IClub[]];
    // [key: string]: any;
}

export interface IClubCreateRequest {
    config: number[];
}

export interface IClubUpdateRequest {
    clubid: number;
    play_config: Array<number | string>;
    info_config: Array<number | string>;
    type: number;
}
