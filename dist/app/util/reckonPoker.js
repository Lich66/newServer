"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const num11 = 11;
const num12 = 12;
const num13 = 13;
const num14 = 14;
const num15 = 15;
const num16 = 16;
const num17 = 17;
const num18 = 18;
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
        if (keys.length === 1 && map[keys[0]] === 4) {
            console.log('葫芦牛: 非癞子牌种类=1,没有对子(1:4),不能构成葫芦牛');
            return false;
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
     * 五花牛逻辑判断
     * 5张都是10及10以上
     * @param cardList 排序过后的玩家的手牌
     */
    static fiveFlowerBull(cardList) {
        let len = cardList.length;
        for (let i = 0; i < len; i++) {
            if (cardList[i][1] !== 0 && cardList[i][1] < 10) {
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
    /**
     * 普通牛判断逻辑
     * @param cardList 排序过后的玩家的手牌
     * @return 牛几:number
     */
    static whichBull(cardList) {
        // 两个癞子
        if (cardList[1][1] === 0) {
            return 10;
        }
        let len = cardList.length;
        // 一个癞子
        if (cardList[0][1] === 0) {
            // 任意三张非癞子牌为10的倍数,则为牛牛
            for (let x = 1; x < len - 2; x++) {
                for (let y = x + 1; y < len - 1; y++) {
                    for (let z = y + 1; z < len; z++) {
                        let cardValue1 = cardList[x][1];
                        if (cardList[x][1] > 10) {
                            cardValue1 = 10;
                        }
                        let cardValue2 = cardList[y][1];
                        if (cardList[y][1] > 10) {
                            cardValue2 = 10;
                        }
                        let cardValue3 = cardList[z][1];
                        if (cardList[z][1] > 10) {
                            cardValue2 = 10;
                        }
                        if ((cardValue1 + cardValue2 + cardValue3) % 10 === 0) {
                            return 10;
                        }
                    }
                }
            }
            // 任意最大的两张非癞子牌,即为牛几
            let max = 0;
            for (let i = 1; i < len - 1; i++) {
                for (let j = i + 1; j < len; j++) {
                    let cardValue1 = cardList[i][1];
                    if (cardList[i][1] > 10) {
                        cardValue1 = 10;
                    }
                    let cardValue2 = cardList[j][1];
                    if (cardList[j][1] > 10) {
                        cardValue2 = 10;
                    }
                    if ((cardValue1 + cardValue2) > max) {
                        max = cardValue1 + cardValue2;
                    }
                }
            }
            return max;
        }
        // 零个癞子 任意三张牌为10的倍数,总点数%10即为牛几
        for (let x = 0; x < len - 2; x++) {
            for (let y = x + 1; y < len - 1; y++) {
                for (let z = y + 1; z < len; z++) {
                    let cardValue1 = cardList[x][1];
                    if (cardList[x][1] > 10) {
                        cardValue1 = 10;
                    }
                    let cardValue2 = cardList[y][1];
                    if (cardList[y][1] > 10) {
                        cardValue2 = 10;
                    }
                    let cardValue3 = cardList[z][1];
                    if (cardList[z][1] > 10) {
                        cardValue2 = 10;
                    }
                    if ((cardValue1 + cardValue2 + cardValue3) % 10 === 0) {
                        let residue = 0; // 余数
                        for (let i = 0; i < len; i++) {
                            if (cardList[i][1] > 10) {
                                residue += 10;
                                continue;
                            }
                            residue += cardList[i][1];
                        }
                        residue %= 10;
                        return residue;
                    }
                }
            }
        }
        return 0;
    }
    /**
     * 获取牌型(特殊牌型+牛几)
     * @param cardList 排序过后的玩家的手牌
     * @param specialCard 特殊牌型规则(8位二进制)
     * @returns 同花顺(18)>五小牛(17)>炸弹牛(16)>四十牛(15)>葫芦牛(14)>同花牛(13)>五花牛(12)>顺子牛(11)>牛牛(10)>牛九(9)>牛八(8)>牛七(7)>牛六(6)>牛五(5)>牛四(4)>牛三(3)>牛二(2)>牛一(1)>无牛(0)
     */
    static getCardsType(cardList, specialCard) {
        if (specialCard.charAt(0) === '1' && ReckonPoker.straightFlush(cardList)) {
            return num18;
        }
        if (specialCard.charAt(1) === '1' && ReckonPoker.fiveCalves(cardList)) {
            return num17;
        }
        if (specialCard.charAt(2) === '1' && ReckonPoker.bombBull(cardList)) {
            return num16;
        }
        if (specialCard.charAt(3) === '1' && ReckonPoker.FortyBull(cardList)) {
            return num15;
        }
        if (specialCard.charAt(4) === '1' && ReckonPoker.gourdBull(cardList)) {
            return num14;
        }
        if (specialCard.charAt(5) === '1' && ReckonPoker.flushBull(cardList)) {
            return num13;
        }
        if (specialCard.charAt(6) === '1' && ReckonPoker.fiveFlowerBull(cardList)) {
            return num12;
        }
        if (specialCard.charAt(7) === '1' && ReckonPoker.straightBull(cardList)) {
            return num11;
        }
        return ReckonPoker.whichBull(cardList);
    }
    // 同花顺>五小牛>炸弹牛>四十牛>葫芦牛>同花牛>顺子牛>牛牛>牛九>牛八>牛七>牛六>牛五>牛四>牛三>牛二>牛一>无牛
    /**
     * 获取牌中的癞子数
     * @param cardList 排序过后的玩家的手牌
     */
    static getLaiZiCount(cardList) {
        let count = 0;
        for (const iterator of cardList) {
            if (iterator[1] === 0) {
                count++;
            }
        }
        return count;
    }
    /**
     * 相同牌型比较
     * @param cardList1 排序过后的玩家的手牌1
     * @param cardList2 排序过后的玩家的手牌2
     */
    static compareCards(cardList1, cardList2, cardsType) {
    }
}
exports.ReckonPoker = ReckonPoker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVja29uUG9rZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvdXRpbC9yZWNrb25Qb2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNqQixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDakIsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNqQixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDakIsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNqQixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDakIsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNqQixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7QUFFakIsTUFBYSxXQUFXO0lBQ3BCOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBb0I7UUFDM0MsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNuQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2YsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RCO1lBQ0QsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3BELE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFF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