"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("../../util/game");
const clubRoom_1 = require("../clubRoom/clubRoom");
class GameManager {
    static async startGame(clubid, roomid, globalChannelStatus) {
        const MAXTime = 50000;
        const clubRoom = await clubRoom_1.ClubRoom.getClubRoom({ roomid });
        // const channel = this.channelService.getChannel(`${redisKeyPrefix.clubRoom}${roomid}`);
        let game = new game_1.Game(clubRoom, globalChannelStatus, clubid);
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
exports.GameManager = GameManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZU1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9nYW1lL2dhbWVNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMENBQXVDO0FBQ3ZDLG1EQUFnRDtBQUVoRCxNQUFhLFdBQVc7SUFDYixNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFjLEVBQUUsTUFBYyxFQUFFLG1CQUErQztRQUN6RyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDdEIsTUFBTSxRQUFRLEdBQUcsTUFBTSxtQkFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFFeEQseUZBQXlGO1FBQ3pGLElBQUksSUFBSSxHQUFHLElBQUksV0FBSSxDQUFDLFFBQVEsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMzRCxrRUFBa0U7UUFDbEUsdUZBQXVGO1FBQ3ZGLDZCQUE2QjtRQUM3Qix1Q0FBdUM7UUFDdkMseUNBQXlDO1FBQ3pDLHNEQUFzRDtRQUN0RCw2REFBNkQ7UUFDN0QsWUFBWTtRQUNaLFFBQVE7UUFDUixJQUFJO1FBQ0osZ0NBQWdDO1FBQ2hDLHNCQUFzQjtRQUN0QixxQ0FBcUM7UUFFckMsd0JBQXdCO1FBQ3hCLHlCQUF5QjtRQUN6Qiw2QkFBNkI7UUFDN0IsaUJBQWlCO1FBQ2pCLG9CQUFvQjtRQUNwQixpQ0FBaUM7UUFDakMsaUNBQWlDO1FBQ2pDLHVCQUF1QjtRQUN2QixRQUFRO1FBQ1IsZUFBZTtJQUNuQixDQUFDO0NBQ0o7QUFoQ0Qsa0NBZ0NDIn0=