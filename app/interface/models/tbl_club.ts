import { Model } from 'sequelize-typescript';
export interface IClub {

    clubid: number;
    uid: number;
    name: string;
    notice: string;
    play_type: number;
    player_num: number;
    base_point: number;
    round: number;
    pay_type: number;
    start_type: number;
    bolus_type: number;
    max_banker_bet: number;
    double_rule: number;
    special_card: string;
    all_contrast_play: number;
    take_turns_play: number;
    up_banker_play: number;
    fast_flag: boolean;
    half_way_add: boolean;
    rubbing_flag: boolean;
    item_use: boolean;
    buy_code: boolean;
    bolus_limit: boolean;
    grab_flag: boolean;
    double_flag: boolean;
    laizi_type: number;
    type: number;
    create_time: Date;
    audit_flag: boolean;
    integral_flag: boolean;
    open_flag: boolean;
    privacy_flag: boolean;
    pay_flag: boolean;
    join_points: number;
    join_rob_banker: number;
    point_setflag: boolean;
    point_adjustflag: boolean;
    point_permission: number;
    present_target: number;
    present_times: number;
    present_points: number;
}


// tslint:disable-next-line: class-name
export interface ITbl_club extends Model<ITbl_club>, IClub {
    // [key: string]: any;
}
