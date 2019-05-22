import { ITbl_room } from '../../interface/models/tbl_room';
import { Game } from '../../util/game';

export class GameControl {
    /**
     * startGame
     */
    public static async startGame(clubRoom: ITbl_room) {
        const game = new Game(clubRoom);
        game.startRound();
    }
}
