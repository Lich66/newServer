"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reckonPoker_1 = require("../util/reckonPoker");
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
let res = reckonPoker_1.ReckonPoker.compareCards(reckonPoker_1.ReckonPoker.sortCardList(cardList), reckonPoker_1.ReckonPoker.sortCardList(cardList1), reckonPoker_1.ReckonPoker.getCardsType((reckonPoker_1.ReckonPoker.sortCardList(cardList)), specialCard));
console.log('相同牌型比较结果(正数第一个大,负数第二个大): ' + res);
// 葫芦牛验证
let result2 = reckonPoker_1.ReckonPoker.gourdBull(reckonPoker_1.ReckonPoker.sortCardList(cardList));
console.log('验证葫芦牛结果: ' + result2);
let result3 = reckonPoker_1.ReckonPoker.gourdBull(reckonPoker_1.ReckonPoker.sortCardList(cardList1));
console.log('验证葫芦牛结果: ' + result3);
let result4 = reckonPoker_1.ReckonPoker.gourdBull(reckonPoker_1.ReckonPoker.sortCardList(cardList2));
console.log('验证葫芦牛结果: ' + result4);
let result5 = reckonPoker_1.ReckonPoker.gourdBull(reckonPoker_1.ReckonPoker.sortCardList(cardList3));
console.log('验证葫芦牛结果: ' + result5);
let result6 = reckonPoker_1.ReckonPoker.gourdBull(reckonPoker_1.ReckonPoker.sortCardList(cardList4));
console.log('验证葫芦牛结果: ' + result6);
let result7 = reckonPoker_1.ReckonPoker.gourdBull(reckonPoker_1.ReckonPoker.sortCardList(cardList5));
console.log('验证葫芦牛结果: ' + result7);
let result8 = reckonPoker_1.ReckonPoker.gourdBull(reckonPoker_1.ReckonPoker.sortCardList(cardList6));
console.log('验证葫芦牛结果: ' + result8);
let result9 = reckonPoker_1.ReckonPoker.bombBull(reckonPoker_1.ReckonPoker.sortCardList(cardList7));
console.log('验证葫芦牛结果: ' + result9);
let result10 = reckonPoker_1.ReckonPoker.bombBull(reckonPoker_1.ReckonPoker.sortCardList(cardList8));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdFJlY2tvblBva2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL3Rlc3QvdGVzdFJlY2tvblBva2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQWtEO0FBQ2xELE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNqQixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDakIsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4RCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekQsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRXpELElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6RCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekQsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRXpELElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6RCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekQsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFB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