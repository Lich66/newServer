import { ReckonPoker } from '../util/reckonPoker';
const num12 = 12;
const num13 = 13;
const num14 = 14;
let cardList = [[2, 2], [4, 2], [1, 2], [3, 2], [5, 0]];
let cardList1 = [[2, 2], [2, 3], [1, 3], [3, 2], [5, 0]];
let cardList2 = [[2, 2], [3, 2], [1, 2], [1, 3], [5, 0]];

let cardList3 = [[2, 2], [2, 3], [1, 1], [6, 0], [5, 0]];
let cardList4 = [[2, 2], [2, 3], [1, 3], [6, 0], [5, 0]];
let cardList5 = [[1, 3], [2, 3], [4, 3], [6, 0], [5, 0]];

let cardList6 = [[3, 3], [2, 3], [1, 3], [4, 3], [2, 1]];
let cardList7 = [[2, 3], [2, 3], [1, 4], [2, 3], [2, 4]];
let cardList8 = [[2, 3], [2, 3], [1, 4], [2, 6], [2, 4]];

// 特殊牌型;['顺子牛', '五花牛', '同花牛', '葫芦牛', '炸弹牛', '五小牛', '同花顺', '四十牛'],选中为1
let specialCard = '11111111';
// 相同牌型比较
let res = ReckonPoker.compareCards(ReckonPoker.sortCardList(cardList), ReckonPoker.sortCardList(cardList1), ReckonPoker.getCardsType((ReckonPoker.sortCardList(cardList)), specialCard));

// 葫芦牛验证
let result2 = ReckonPoker.gourdBull(ReckonPoker.sortCardList(cardList));
console.log('验证葫芦牛结果: ' + result2);
let result3 = ReckonPoker.gourdBull(ReckonPoker.sortCardList(cardList1));
console.log('验证葫芦牛结果: ' + result3);
let result4 = ReckonPoker.gourdBull(ReckonPoker.sortCardList(cardList2));
console.log('验证葫芦牛结果: ' + result4);
let result5 = ReckonPoker.gourdBull(ReckonPoker.sortCardList(cardList3));
console.log('验证葫芦牛结果: ' + result5);
let result6 = ReckonPoker.gourdBull(ReckonPoker.sortCardList(cardList4));
console.log('验证葫芦牛结果: ' + result6);
let result7 = ReckonPoker.gourdBull(ReckonPoker.sortCardList(cardList5));
console.log('验证葫芦牛结果: ' + result7);
let result8 = ReckonPoker.gourdBull(ReckonPoker.sortCardList(cardList6));
console.log('验证葫芦牛结果: ' + result8);
let result9 = ReckonPoker.bombBull(ReckonPoker.sortCardList(cardList7));
console.log('验证葫芦牛结果: ' + result9);
let result10 = ReckonPoker.bombBull(ReckonPoker.sortCardList(cardList8));
console.log('验证葫芦牛结果: ' + result10);

// // 炸弹牛验证
// let result2 = ReckonPoker.bombBull(ReckonPoker.sortCardList(cardList));
// console.log('验证炸弹牛结果: ' + result2);
// let result3 = ReckonPoker.bombBull(ReckonPoker.sortCardList(cardList1));
// console.log('验证炸弹牛结果: ' + result3);
// let result4 = ReckonPoker.bombBull(ReckonPoker.sortCardList(cardList2));
// console.log('验证炸弹牛结果: ' + result4);
// let result5 = ReckonPoker.bombBull(ReckonPoker.sortCardList(cardList3));
// console.log('验证炸弹牛结果: ' + result5);
// let result6 = ReckonPoker.bombBull(ReckonPoker.sortCardList(cardList4));
// console.log('验证炸弹牛结果: ' + result6);
// let result7 = ReckonPoker.bombBull(ReckonPoker.sortCardList(cardList5));
// console.log('验证炸弹牛结果: ' + result7);
// let result8 = ReckonPoker.bombBull(ReckonPoker.sortCardList(cardList6));
// console.log('验证炸弹牛结果: ' + result8);
// let result9 = ReckonPoker.bombBull(ReckonPoker.sortCardList(cardList7));
// console.log('验证炸弹牛结果: ' + result9);

// // 五小牛验证
// let result2 = ReckonPoker.fiveCalves(ReckonPoker.sortCardList(cardList));
// console.log('验证五小牛结果: ' + result2);
// let result3 = ReckonPoker.fiveCalves(ReckonPoker.sortCardList(cardList1));
// console.log('验证五小牛结果: ' + result3);
// let result4 = ReckonPoker.fiveCalves(ReckonPoker.sortCardList(cardList2));
// console.log('验证五小牛结果: ' + result4);
// let result5 = ReckonPoker.fiveCalves(ReckonPoker.sortCardList(cardList3));
// console.log('验证五小牛结果: ' + result5);
// let result6 = ReckonPoker.fiveCalves(ReckonPoker.sortCardList(cardList4));
// console.log('验证五小牛结果: ' + result6);
// let result7 = ReckonPoker.fiveCalves(ReckonPoker.sortCardList(cardList5));
// console.log('验证五小牛结果: ' + result7);
// let result8 = ReckonPoker.fiveCalves(ReckonPoker.sortCardList(cardList6));
// console.log('验证五小牛结果: ' + result8);
// let result9 = ReckonPoker.fiveCalves(ReckonPoker.sortCardList(cardList7));
// console.log('验证五小牛结果: ' + result9);

// // 同花顺验证
// let result1 = ReckonPoker.straightFlush(ReckonPoker.sortCardList(cardList));
// console.log('验证同花顺结果: ' + result1);

// // 排序牌
// let result = ReckonPoker.sortCardList(cardList);
