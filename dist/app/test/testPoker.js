"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// sequelize
const clubRoom_1 = require("../controller/clubRoom/clubRoom");
const sequelize_1 = require("../db/sequelize");
sequelize_1.sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
class Test {
    static async test() {
        const clubroom = await clubRoom_1.ClubRoom.getClubRoom({ roomid: 1 });
        // const game = new Game(clubroom);
        // game.sendPoker();
    }
}
Test.test();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdFBva2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL3Rlc3QvdGVzdFBva2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsWUFBWTtBQUNaLDhEQUEyRDtBQUMzRCwrQ0FBNEM7QUFHNUMscUJBQVM7S0FDTixZQUFZLEVBQUU7S0FDZCxJQUFJLENBQUMsR0FBRyxFQUFFO0lBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO0FBQy9ELENBQUMsQ0FBQztLQUNELEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUMzRCxDQUFDLENBQUMsQ0FBQztBQUNMLE1BQU0sSUFBSTtJQUNDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSTtRQUNwQixNQUFNLFFBQVEsR0FBRyxNQUFNLG1CQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0QsbUNBQW1DO1FBQ25DLG9CQUFvQjtJQUN4QixDQUFDO0NBQ0o7QUFDRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMifQ==