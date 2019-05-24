// sequelize
import { ClubRoom } from '../controller/clubRoom/clubRoom';
import { sequelize } from '../db/sequelize';
import { Game } from '../util/game';

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
class Test {
    public static async test() {
        const clubroom = await ClubRoom.getClubRoom({ roomid: 1 });
        // const game = new Game(clubroom);
        // game.sendPoker();
    }
}
Test.test();
