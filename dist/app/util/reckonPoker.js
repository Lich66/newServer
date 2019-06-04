"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const num20 = 20;
const num30 = 30;
const num40 = 40;
class ReckonPoker {
    /**
     * 升序排列手牌(王最小)
     * @param cardList 玩家的手牌
     */
    static sortCardList(cardList) {
        cardList.sort((a, b) => {
            if (a[1] === b[1]) {
                return a[0] - b[0];
            }
            return a[1] - b[1];
        });
        console.log('\n排序好的牌为：' + JSON.stringify(cardList));
        return cardList;
    }
    /**
     * 同花顺判断逻辑
     * 同花+顺子
     * @param cardList 排序过后的玩家的手牌
     */
    static straightFlush(cardList) {
        let len = cardList.length - 1;
        // 是否有非癞子的相同牌
        for (let i = 0; i < len; i++) {
            if (cardList[i][1] !== 0 && cardList[i][1] === cardList[i + 1][1]) {
                console.log('同花顺: 有两张相同的非癞子牌!');
                return false;
            }
        }
        // 是否有非癞子的不相同花色
        for (let i = 0; i < len; i++) {
            if (cardList[i][1] !== 0 && cardList[i][0] !== cardList[i + 1][0]) {
                console.log('同花顺: 有两张花色不同的非癞子牌!');
                return false;
            }
        }
        // 是否能构成顺子(相邻非癞子两牌的值相差之和不超过4)
        let num = 0;
        for (let i = 0; i < len; i++) {
            if (cardList[i][1] !== 0 && cardList[i + 1][1] !== 0) {
                num += (cardList[i + 1][1] - cardList[i][1]);
            }
            if (num > 4) {
                console.log('同花顺: 构不成顺子!');
                return false;
            }
        }
        return true;
    }
    /**
     * 五小牛判断逻辑
     * 五张之和小于等于10
     * @param cardList 排序过后的玩家的手牌
     */
    static fiveCalves(cardList) {
        let len = cardList.length;
        let sum = 0; // 总点数
        let count = 0; // 癞子个数
        for (let i = 0; i < len; i++) {
            if (cardList[i][1] !== 0) {
                sum += cardList[i][1];
            }
            else {
                count++;
            }
            if (count === 2 && sum > 8) {
                console.log('五小牛: 两个癞子,构不成五小牛!');
                return false;
            }
            if (count === 1 && sum > 9) {
                console.log('五小牛: 一个癞子,构不成五小牛!');
                return false;
            }
            if (sum > 10) {
                console.log('五小牛: 一定不是五小牛!');
                return false;
            }
        }
        return true;
    }
    /**
     * 炸弹牛判断逻辑
     * 四张一样的炸弹
     * @param cardList 排序过后的玩家的手牌
     */
    static bombBull(cardList) {
        let map = {}; // 牌值:张数
        let count = 0; // 癞子个数
        for (const iterator of cardList) {
            if (iterator[1] === 0) {
                count++;
                continue;
            }
            if (map.hasOwnProperty(iterator[1])) {
                map[iterator[1]]++;
            }
            else {
                map[iterator[1]] = 1;
            }
        }
        console.log('炸弹牛: 统计后的[牌值:张数] = ' + JSON.stringify(map));
        let keys = Object.keys(map);
        if (keys.length > 2) {
            console.log('炸弹牛: 非癞子牌种类>2,不能构成炸弹');
            return false;
        }
        if (keys.length === 2) {
            if ((map[keys[0]] + count) < 4 && (map[keys[1]] + count) < 4) {
                console.log('炸弹牛: 牌种类=2,牌张数+癞子数<4,不能构成炸弹');
                return false;
            }
        }
        return true;
    }
    /**
     * 四十牛判断逻辑
     * 五张之和大于等于40
     * @param cardList 排序过后的玩家的手牌(里面没有JQK)
     */
    static FortyBull(cardList) {
        let num = 0; // 总点数
        let count = 0; // 癞子个数
        for (const iterator of cardList) {
            if (iterator[1] === 0) {
                count++;
                continue;
            }
            num += iterator[1];
        }
        if (num >= num40) {
            return true;
        }
        if (count === 1 && num >= num30) {
            return true;
        }
        if (count === 2 && num >= num20) {
            return true;
        }
        return false;
    }
    /**
     * 葫芦牛判断逻辑
     * 对子+三张
     * @param cardList 排序过后的玩家的手牌
     */
    static gourdBull(cardList) {
        let map = {};
        let count = 0;
        for (const iterator of cardList) {
            if (iterator[1] === 0) {
                count++;
                continue;
            }
            if (map.hasOwnProperty(iterator[1])) {
                map[iterator[1]]++;
            }
            else {
                map[iterator[1]] = 1;
            }
        }
        console.log('葫芦牛: 统计后的[牌值:个数] = ' + JSON.stringify(map));
        let keys = Object.keys(map);
        if (keys.length > 2) {
            console.log('葫芦牛: 非癞子牌种类>2,不能构成葫芦牛');
            return false;
        }
        if (keys.length === 2) {
            if ((map[keys[0]] === 1 && map[keys[1]] === 4) || (map[keys[0]] === 4 && map[keys[1]] === 1)) {
                console.log('葫芦牛: 非癞子牌种类=2,没有对子(1:4),不能构成葫芦牛');
                return false;
            }
        }
        return true;
    }
    /**
     * 同花牛判断逻辑
     * 同花
     * @param cardList 排序过后的玩家的手牌
     */
    static flushBull(cardList) {
        let len = cardList.length - 1;
        // 是否有非癞子的不相同花色
        for (let i = 0; i < len; i++) {
            if (cardList[i][1] !== 0 && cardList[i][0] !== cardList[i + 1][0]) {
                console.log('同花牛: 有两张花色不同的非癞子牌!');
                return false;
            }
        }
        return true;
    }
    /**
     * 顺子牛判断逻辑
     * 顺子
     * @param cardList 排序过后的玩家的手牌
     */
    static straightBull(cardList) {
        let len = cardList.length - 1;
        // 是否有非癞子的相同牌
        for (let i = 0; i < len; i++) {
            if (cardList[i][1] !== 0 && cardList[i][1] === cardList[i + 1][1]) {
                console.log('顺子牛: 有两张相同的非癞子牌!');
                return false;
            }
        }
        // 是否能构成顺子(相邻非癞子两牌的值相差之和不超过4)
        let num = 0;
        for (let i = 0; i < len; i++) {
            if (cardList[i][1] !== 0 && cardList[i + 1][1] !== 0) {
                num += (cardList[i + 1][1] - cardList[i][1]);
            }
            if (num > 4) {
                console.log('顺子牛: 构不成顺子!');
                return false;
            }
        }
        return true;
    }
}
exports.ReckonPoker = ReckonPoker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVja29uUG9rZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvdXRpbC9yZWNrb25Qb2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNqQixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDakIsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBRWpCLE1BQWEsV0FBVztJQUNwQjs7O09BR0c7SUFDSSxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQW9CO1FBQzNDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNmLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN0QjtZQUNELE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNwRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBb0I7UUFDNUMsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDOUIsYUFBYTtRQUNiLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUIsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFD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