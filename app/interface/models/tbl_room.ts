import { Model } from 'sequelize-typescript';
export interface IRoom {
    roomid: number;
    clubid: number;
    create_time: Date;
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
    emotion: boolean;
    grab_flag: boolean;
    double_flag: boolean;
    laizi_type: number;
}


// tslint:disable-next-line: class-name
export interface ITbl_room extends Model<ITbl_room>, IRoom {
    // [key: string]: any;
}
