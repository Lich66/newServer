export interface ICreateRoomRequest {
    roomConfig: Array<number | string>;
    // [key: string]: any;
}

export interface IJoinRoomRequest {
    roomId: number;
    sid: string;
}
