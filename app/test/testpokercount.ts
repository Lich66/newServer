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

