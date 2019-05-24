import { GlobalChannelServiceStatus } from 'pinus-global-channel-status';
import { Game } from '../../util/game';
import { ClubRoom } from '../clubRoom/clubRoom';

export class GameManager {
    public static async startGame(clubid: number, roomid: number, globalChannelStatus: GlobalChannelServiceStatus) {
        const MAXTime = 50000;
        const clubRoom = await ClubRoom.getClubRoom({ roomid });

        // const channel = this.channelService.getChannel(`${redisKeyPrefix.clubRoom}${roomid}`);
        let game = new Game(clubRoom, globalChannelStatus, clubid);
        // this.app.set(`${gameKeyPrefix.club_room_game}${roomid}`, game);
        // const state = await redisClient.hgetallAsync(`${redisKeyPrefix.clubRoom}${roomid}`);
        // for (const key in state) {
        //     if (state.hasOwnProperty(key)) {
        //         // const element = state[key];
        //         if (key.startsWith(redisKeyPrefix.chair)) {
        //             game.pushUser(Number.parseInt(state[key], 0));
        //         }
        //     }
        // }
        // const round = clubRoom.round;
        // let roundIndex = 1;
        // const timmer = setInterval(() => {

        //     game.sendPoker();
        //     setTimeout(() => {
        //         game.settlement();
        //     }, 10000);
        //     roundIndex++;
        //     if (roundIndex == round) {
        //         clearInterval(timmer);
        //         game = null;
        //     }
        // }, MAXTime);
    }
}
