export interface ICreateRoomRequest {
    uid: string,
    roomConfig: number[][]
}

export interface IJoinRoomRequest {
    uid: string,
    roomid: number
}