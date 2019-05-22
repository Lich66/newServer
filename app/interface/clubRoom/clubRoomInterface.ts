import { IResponse } from '../global/response';
import { IClub } from '../models/tbl_club';
import { IRoom } from '../models/tbl_room';

export interface IClubRoomRpc {
    uid?: number;
    roomid?: number;
    sid?: string;
    clubid?: number;
    flag?: boolean;
}

export interface IClubReturn extends IResponse {
    data?: IClub | IClub[] | number | [number, IClub[]];
    // [key: string]: any;
}

/**
 * 客户端传入的参数 基本只用到roomid
 */
export interface IClubRoomRequest {
    roomid?: number;
    clubid?: number;
    create_time?: Date;
    play_type?: number;
    base_point?: number;
    player_num?: number;
    round?: number;
    room_pay?: number;
    start_option?: number;
    push_flag?: boolean;
    max_grab?: number;
    double_rule?: number;
    special_card?: string;
    all_contrast_play?: number;
    take_turns_play?: number;
    up_banker_play?: number;
    fast_flag?: number;
    half_way_add?: number;
    rubbing_flag?: number;
    item_use?: number;
    buy_code?: number;
    emotion?: number;
    grab_flag?: number;
    double_flag?: number;
    laizi_type?: number;
    // [key: string]: any;
}
/**
 * crud 用到的 参数  必须加入到uid  用不用道再说
 */
export interface IClubRoomCRUD extends IClubRoomRequest {
    uid: string;
}

export interface IClubRoomReturn extends IResponse {
    data?: IRoom | IRoom[] | number | [number, IRoom[]];
    // [key: string]: any;
}
export interface IClubRoomStateReturn extends IResponse {
    data?: any[];
    // [key: string]: any;
}
