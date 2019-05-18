import { IResponse } from '../../global/response';
import { IRoom } from '../../models/tbl_room';
/**
 * 客户端传入的参数 基本只用到roomid
 */
export interface IClubRoomRequest {
    roomid?: number;
    clubid?: number;
    create_time?: Date;
    owner?: string;
    play_type?: number;
    base_point?: number;
    player_num?: number;
    round?: number;
    room_pay?: number;
    start_option?: number;
    push_flag?: boolean;
    max_grab?: number;
    double_rule?: number;
    special_card?: number;
    fast_flag?: boolean;
    half_way_add?: boolean;
    rubbing_flag?: boolean;
    item_use?: boolean;
    buy_code?: boolean;
    emotion?: boolean;
    grab_flag?: boolean;
    double_flag?: boolean;
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
