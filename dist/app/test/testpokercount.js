// // sequelize
// import { ClubRoom } from '../controller/clubRoom/clubRoom';
// import { sequelize } from '../db/sequelize';
// import { test } from '../models/test';
// const num11 = 11;
// const num12 = 12;
// const num13 = 13;
// const pokers = [
//     [1, 1],
//     [1, 2],
//     [1, 3],
//     [1, 4],
//     [1, 5],
//     [1, 6],
//     [1, 7],
//     [1, 8],
//     [1, 9],
//     [1, 10],
//     [1, num11],
//     [1, num12],
//     [1, num13],
//     [2, 1],
//     [2, 2],
//     [2, 3],
//     [2, 4],
//     [2, 5],
//     [2, 6],
//     [2, 7],
//     [2, 8],
//     [2, 9],
//     [2, 10],
//     [2, num11],
//     [2, num12],
//     [2, num13],
//     [3, 1],
//     [3, 2],
//     [3, 3],
//     [3, 4],
//     [3, 5],
//     [3, 6],
//     [3, 7],
//     [3, 8],
//     [3, 9],
//     [3, 10],
//     [3, num11],
//     [3, num12],
//     [3, num13],
//     [4, 1],
//     [4, 2],
//     [4, 3],
//     [4, 4],
//     [4, 5],
//     [4, 6],
//     [4, 7],
//     [4, 8],
//     [4, 9],
//     [4, 10],
//     [4, num11],
//     [4, num12],
//     [4, num13],
//     [5, 1],
//     [5, 2]
// ];
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch((err) => {
//         console.error('Unable to connect to the database:', err);
//     });
// class Test {
//     public static async test() {
//         const clubroom = await ClubRoom.getClubRoom({ roomid: 1 });
//         // const game = new Game(clubroom);
//         // game.sendPoker();
//         const length = 54;
//         let p1 = 0;
//         // let p2 = index + 1;
//         // let p3 = index + 2;
//         // let p4 = index + 3;
//         // let p5 = index + 4;
//         while (p1 + 4 < length) {
//             let p2 = p1 + 1;
//             while (p2 + 3 < length) {
//                 let p3 = p2 + 1;
//                 while (p3 + 2 < length) {
//                     let p4 = p3 + 1;
//                     while (p4 + 1 < length) {
//                         let p5 = p4 + 1;
//                         while (p5 < length) {
//                             await test.create<test>({
//                                 p1: `${pokers[p1][0]}*${pokers[p1][1]}`,
//                                 p2: `${pokers[p2][0]}*${pokers[p2][1]}`,
//                                 p3: `${pokers[p3][0]}*${pokers[p3][1]}`,
//                                 p4: `${pokers[p4][0]}*${pokers[p4][1]}`,
//                                 p5: `${pokers[p5][0]}*${pokers[p5][1]}`
//                             });
//                             p5++;
//                         }
//                         p4++;
//                     }
//                     p3++;
//                 }
//                 p2++;
//             }
//             p1++;
//         }
//     }
// }
// Test.test();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdHBva2VyY291bnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvdGVzdC90ZXN0cG9rZXJjb3VudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxlQUFlO0FBQ2YsOERBQThEO0FBQzlELCtDQUErQztBQUMvQyx5Q0FBeUM7QUFHekMsb0JBQW9CO0FBQ3BCLG9CQUFvQjtBQUNwQixvQkFBb0I7QUFDcEIsbUJBQW1CO0FBQ25CLGNBQWM7QUFDZCxjQUFjO0FBQ2QsY0FBYztBQUNkLGNBQWM7QUFDZCxjQUFjO0FBQ2QsY0FBYztBQUNkLGNBQWM7QUFDZCxjQUFjO0FBQ2QsY0FBYztBQUNkLGVBQWU7QUFDZixrQkFBa0I7QUFDbEIsa0JBQWtCO0FBQ2xCLGtCQUFrQjtBQUNsQixjQUFjO0FBQ2QsY0FBYztBQUNkLGNBQWM7QUFDZCxjQUFjO0FBQ2QsY0FBYztBQUNkLGNBQWM7QUFDZCxjQUFjO0FBQ2QsY0FBYztBQUNkLGNBQWM7QUFDZCxlQUFlO0FBQ2Ysa0JBQWtCO0FBQ2xCLGtCQUFrQjtBQUNsQixrQkFBa0I7QUFDbEIsY0FBYztBQUNkLGNBQWM7QUFDZCxjQUFjO0FBQ2QsY0FBYztBQUNkLGNBQWM7QUFDZCxjQUFjO0FBQ2QsY0FBYztBQUNkLGNBQWM7QUFDZCxjQUFjO0FBQ2QsZUFBZTtBQUNmLGtCQUFrQjtBQUNsQixrQkFBa0I7QUFDbEIsa0JBQWtCO0FBQ2xCLGNBQWM7QUFDZCxjQUFjO0FBQ2QsY0FBYztBQUNkLGNBQWM7QUFDZCxjQUFjO0FBQ2QsY0FBYztBQUNkLGNBQWM7QUFDZCxjQUFjO0FBQ2QsY0FBYztBQUNkLGVBQWU7QUFDZixrQkFBa0I7QUFDbEIsa0JBQWtCO0FBQ2xCLGtCQUFrQjtBQUNsQixjQUFjO0FBQ2QsYUFBYTtBQUNiLEtBQUs7QUFFTCxZQUFZO0FBQ1osc0JBQXNCO0FBQ3RCLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsU0FBUztBQUNULHdCQUF3QjtBQUN4QixvRUFBb0U7QUFDcEUsVUFBVTtBQUNWLGVBQWU7QUFDZixtQ0FBbUM7QUFDbkMsc0VBQXNFO0FBQ3RFLDhDQUE4QztBQUM5QywrQkFBK0I7QUFFL0IsNkJBQTZCO0FBQzdCLHNCQUFzQjtBQUN0QixpQ0FBaUM7QUFDakMsaUNBQWlDO0FBQ2pDLGlDQUFpQztBQUNqQyxpQ0FBaUM7QUFDakMsb0NBQW9DO0FBQ3BDLCtCQUErQjtBQUMvQix3Q0FBd0M7QUFDeEMsbUNBQW1DO0FBQ25DLDRDQUE0QztBQUM1Qyx1Q0FBdUM7QUFDdkMsZ0RBQWdEO0FBQ2hELDJDQUEyQztBQUMzQyxnREFBZ0Q7QUFDaEQsd0RBQXdEO0FBQ3hELDJFQUEyRTtBQUMzRSwyRUFBMkU7QUFDM0UsMkVBQTJFO0FBQzNFLDJFQUEyRTtBQUMzRSwwRUFBMEU7QUFDMUUsa0NBQWtDO0FBQ2xDLG9DQUFvQztBQUNwQyw0QkFBNEI7QUFDNUIsZ0NBQWdDO0FBQ2hDLHdCQUF3QjtBQUN4Qiw0QkFBNEI7QUFDNUIsb0JBQW9CO0FBQ3BCLHdCQUF3QjtBQUN4QixnQkFBZ0I7QUFFaEIsb0JBQW9CO0FBQ3BCLFlBQVk7QUFDWixRQUFRO0FBQ1IsSUFBSTtBQUNKLGVBQWUifQ==