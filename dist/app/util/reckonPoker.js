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
     * 获取牌中的癞子数
     * @param cardList 排序过后的玩家的手牌
     */
    static getLaiZiCount(cardList) {
        if (cardList[1][1] === 0) {
            return 2;
        }
        if (cardList[0][1] === 0) {
            return 1;
        }
        return 0;
    }
    /**
     * 相邻两张非癞子牌的差值之和
     * @param cardList 排序过后的玩家的手牌
     */
    static sumOfDifferences(cardList) {
        let len = cardList.length - 1;
        let sum = 0;
        for (let i = 0; i < len; i++) {
            if (cardList[i][1] !== 0 && cardList[i + 1][1] !== 0) {
                sum += (cardList[i + 1][1] - cardList[i][1]);
            }
        }
        return sum;
    }
    /**
     * 牌面统计 {牌值:张数}
     * @param cardList 排序过后的玩家的手牌
     */
    static cardStatistics(cardList) {
        let map = {};
        for (const iterator of cardList) {
            if (iterator[1] === 0) {
                continue;
            }
            if (map.hasOwnProperty(iterator[1])) {
                map[iterator[1]]++;
            }
            else {
                map[iterator[1]] = 1;
            }
        }
        console.log('牌面统计: 统计后的[牌值:张数] = ' + JSON.stringify(map));
        return map;
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
        if (ReckonPoker.sumOfDifferences(cardList) > 4) {
            console.log('同花顺: 相邻非癞子两牌的值相差之和超过4');
            return false;
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
        let map = ReckonPoker.cardStatistics(cardList); // 牌值:张数
        let count = ReckonPoker.getLaiZiCount(cardList); // 癞子个数
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
        let map = ReckonPoker.cardStatistics(cardList);
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
        if (ReckonPoker.sumOfDifferences(cardList) > 4) {
            return false;
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
            console.log('普通牛: 两个癞子,都为牛牛!');
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
                            console.log('普通牛: 一个癞子,任意三张为10的倍数!');
                            return 10;
                        }
                    }
                }
            }
            // todo 任意两张为10的倍数也应为牛牛
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
                    let temp = (cardValue1 + cardValue2);
                    if (temp > 10) {
                        temp %= 10;
                        if (temp === 0) {
                            temp = 10;
                        }
                    }
                    if (temp > max) {
                        max = temp;
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
                        cardValue3 = 10;
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
                        if (residue === 0) {
                            return 10;
                        }
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
        if (specialCard.charAt(6) === '1' && ReckonPoker.straightFlush(cardList)) {
            return num18;
        }
        if (specialCard.charAt(5) === '1' && ReckonPoker.fiveCalves(cardList)) {
            return num17;
        }
        if (specialCard.charAt(4) === '1' && ReckonPoker.bombBull(cardList)) {
            return num16;
        }
        if (specialCard.charAt(7) === '1' && ReckonPoker.FortyBull(cardList)) {
            return num15;
        }
        if (specialCard.charAt(3) === '1' && ReckonPoker.gourdBull(cardList)) {
            return num14;
        }
        if (specialCard.charAt(2) === '1' && ReckonPoker.flushBull(cardList)) {
            return num13;
        }
        if (specialCard.charAt(1) === '1' && ReckonPoker.fiveFlowerBull(cardList)) {
            return num12;
        }
        if (specialCard.charAt(0) === '1' && ReckonPoker.straightBull(cardList)) {
            return num11;
        }
        return ReckonPoker.whichBull(cardList);
    }
    /**
     * 获取玩家用于比牌的最大手牌
     * @param cardList 排序过后的玩家的手牌
     */
    static getMaxCard(cardList, cardsType, laiziCount) {
        // 没有癞子，炸弹牛和葫芦牛第三张即为最大，其他牌型第五张最大
        if (laiziCount === 0) {
            if (cardsType === num14 || cardsType === num16) {
                return cardList[3];
            }
            return cardList[4];
        }
        let maxCardValue = 0;
        let maxColorValue = 0;
        if (laiziCount === 1) {
            maxColorValue = cardList[0][0];
        }
        else {
            maxColorValue = cardList[1][0];
        }
        // 有癞子，除顺子牛，葫芦牛，炸弹牛，同花顺外，癞子即为最大
        if (cardsType !== num11 && cardsType !== num14 && cardsType !== num16 && cardsType !== num18) {
            return [maxColorValue, num13];
        }
        // 有癞子，顺子牛和同花顺
        if (cardsType === num11 || cardsType === num18) {
            let sum = ReckonPoker.sumOfDifferences(cardList);
            // 相邻两张牌的差值之和为2，3，4时,最大牌值为第五张值+2，第五张值+1，第五张值;如果超过13,则最大为13
            maxCardValue = cardList[4][1] + 4 - sum;
            if (maxCardValue > num13) {
                return [maxColorValue, num13];
            }
            return [maxColorValue, maxCardValue];
        }
        // 有癞子，葫芦牛
        if (cardsType === num14) {
            if (laiziCount === 2) {
                maxCardValue = cardList[4][1];
                return [maxColorValue, maxCardValue];
            }
            maxCardValue = cardList[3][1];
            return [maxColorValue, maxCardValue];
        }
        // 有癞子，炸弹牛
        maxCardValue = cardList[3][1];
        return [maxColorValue, maxCardValue];
    }
    /**
     * 相同牌型比较
     * @param cardList1 排序过后的玩家的手牌1
     * @param cardList2 排序过后的玩家的手牌2
     */
    static compareCards(cardList1, cardList2, cardsType) {
        let laiziCount1 = ReckonPoker.getLaiZiCount(cardList1);
        let laiziCount2 = ReckonPoker.getLaiZiCount(cardList2);
        let maxCard1 = ReckonPoker.getMaxCard(cardList1, cardsType, laiziCount1);
        console.log('玩家1最大牌为: ' + JSON.stringify(maxCard1));
        let maxCard2 = ReckonPoker.getMaxCard(cardList2, cardsType, laiziCount2);
        console.log('玩家2最大牌为: ' + JSON.stringify(maxCard2));
        if (maxCard1[1] === maxCard2[1]) {
            return maxCard1[0] - maxCard2[0];
        }
        return maxCard1[1] - maxCard2[1];
    }
}
exports.ReckonPoker = ReckonPoker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVja29uUG9rZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvdXRpbC9yZWNrb25Qb2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNqQixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDakIsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNqQixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDakIsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNqQixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDakIsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNqQixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7QUFFakIsTUFBYSxXQUFXO0lBQ3BCOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBb0I7UUFDM0MsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNuQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2YsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RCO1lBQ0QsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3BELE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQW9CO1FBQzVDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN0QixPQUFPLENBQUMsQ0FBQztTQUNaO1FBQ0QsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3RCLE9BQU8sQ0FBQyxDQUFDO1NBQ1o7UUFDRCxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBb0I7UUFDL0MsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQixJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2xELEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEQ7U0FDSjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBb0I7UUFDN0MsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsS0FBSyxNQUFNLFFBQVEsSUFBSSxRQUFRLEVBQUU7WUFDN0IsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNuQixTQUFTO2FBQ1o7WUFDRCxJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2pDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2FBQ3RCO2lCQUFNO2dCQUNILEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDeEI7U0FDSjtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzFELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQW9CO1FBQzVDLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLGFBQWE7UUFDYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFCLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUNoQyxPQUFPLEtBQUssQ0FBQzthQUNoQjtTQUNKO1FBQ0QsZUFBZTtRQUNmLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUIsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUMvRCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7Z0JBQ2xDLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1NBQ0o7UUFDRCw2QkFBNkI7UUFDN0IsSUFBSSxXQUFXLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUNyQyxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFvQjtRQUN6QyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFJLE1BQU07UUFDdEIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUUsT0FBTztRQUN2QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFCLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDdEIsR0FBRyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN6QjtpQkFBTTtnQkFDSCxLQUFLLEVBQUUsQ0FBQzthQUNYO1lBQ0QsSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7Z0JBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFDakMsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRTtnQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUNqQyxPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUNELElBQUksR0FBRyxHQUFHLEVBQUUsRUFBRTtnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUM3QixPQUFPLEtBQUssQ0FBQzthQUNoQjtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQW9CO1FBQ3ZDLElBQUksR0FBRyxHQUFHLFdBQVcsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBRyxRQUFRO1FBQzFELElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBRSxPQUFPO1FBQ3pELElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDcEMsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO2dCQUMzQyxPQUFPLEtBQUssQ0FBQzthQUNoQjtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQW9CO1FBQ3hDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFJLE1BQU07UUFDdEIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUUsT0FBTztRQUN2QixLQUFLLE1BQU0sUUFBUSxJQUFJLFFBQVEsRUFBRTtZQUM3QixJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ25CLEtBQUssRUFBRSxDQUFDO2dCQUNSLFNBQVM7YUFDWjtZQUNELEdBQUcsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEI7UUFDRCxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUU7WUFDZCxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUU7WUFDN0IsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksS0FBSyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksS0FBSyxFQUFFO1lBQzdCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBb0I7UUFDeEMsSUFBSSxHQUFHLEdBQUcsV0FBVyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDMUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO2dCQUMvQyxPQUFPLEtBQUssQ0FBQzthQUNoQjtTQUNKO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQztZQUMvQyxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFvQjtRQUN4QyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUM5QixlQUFlO1FBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQixJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztnQkFDbEMsT0FBTyxLQUFLLENBQUM7YUFDaEI7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFvQjtRQUM3QyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQzFCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUIsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQzdDLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBb0I7UUFDM0MsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDOUIsYUFBYTtRQUNiLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUIsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUMvRCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQ2hDLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1NBQ0o7UUFDRCw2QkFBNkI7UUFDN0IsSUFBSSxXQUFXLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzVDLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQW9CO1FBQ3hDLE9BQU87UUFDUCxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQy9CLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFDRCxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQzFCLE9BQU87UUFDUCxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdEIsc0JBQXNCO1lBQ3RCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM5QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ2xDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUM5QixJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2hDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTs0QkFDckIsVUFBVSxHQUFHLEVBQUUsQ0FBQzt5QkFDbkI7d0JBQ0QsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNoQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7NEJBQ3JCLFVBQVUsR0FBRyxFQUFFLENBQUM7eUJBQ25CO3dCQUNELElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDaEMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFOzRCQUNyQixVQUFVLEdBQUcsRUFBRSxDQUFDO3lCQUNuQjt3QkFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFOzRCQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7NEJBQ3JDLE9BQU8sRUFBRSxDQUFDO3lCQUNiO3FCQUNKO2lCQUNKO2FBQ0o7WUFDRCx1QkFBdUI7WUFFdkIsbUJBQW1CO1lBQ25CLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNaLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM5QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDOUIsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7d0JBQ3JCLFVBQVUsR0FBRyxFQUFFLENBQUM7cUJBQ25CO29CQUNELElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDaEMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO3dCQUNyQixVQUFVLEdBQUcsRUFBRSxDQUFDO3FCQUNuQjtvQkFDRCxJQUFJLElBQUksR0FBRyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsQ0FBQztvQkFDckMsSUFBSSxJQUFJLEdBQUcsRUFBRSxFQUFFO3dCQUNYLElBQUksSUFBSSxFQUFFLENBQUM7d0JBQ1gsSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFOzRCQUNaLElBQUksR0FBRyxFQUFFLENBQUM7eUJBQ2I7cUJBQ0o7b0JBQ0QsSUFBSSxJQUFJLEdBQUcsR0FBRyxFQUFFO3dCQUNaLEdBQUcsR0FBRyxJQUFJLENBQUM7cUJBQ2Q7aUJBQ0o7YUFDSjtZQUNELE9BQU8sR0FBRyxDQUFDO1NBQ2Q7UUFDRCw4QkFBOEI7UUFDOUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDOUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNsQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDOUIsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7d0JBQ3JCLFVBQVUsR0FBRyxFQUFFLENBQUM7cUJBQ25CO29CQUNELElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDaEMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO3dCQUNyQixVQUFVLEdBQUcsRUFBRSxDQUFDO3FCQUNuQjtvQkFDRCxJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2hDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTt3QkFDckIsVUFBVSxHQUFHLEVBQUUsQ0FBQztxQkFDbkI7b0JBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRTt3QkFDbkQsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUksS0FBSzt3QkFDekIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTs0QkFDMUIsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dDQUNyQixPQUFPLElBQUksRUFBRSxDQUFDO2dDQUNkLFNBQVM7NkJBQ1o7NEJBQ0QsT0FBTyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDN0I7d0JBQ0QsT0FBTyxJQUFJLEVBQUUsQ0FBQzt3QkFDZCxJQUFJLE9BQU8sS0FBSyxDQUFDLEVBQUU7NEJBQ2YsT0FBTyxFQUFFLENBQUM7eUJBQ2I7d0JBQ0QsT0FBTyxPQUFPLENBQUM7cUJBQ2xCO2lCQUNKO2FBQ0o7U0FDSjtRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFvQixFQUFFLFdBQW1CO1FBQ2hFLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN0RSxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNuRSxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNqRSxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNsRSxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNsRSxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNsRSxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN2RSxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNyRSxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELE9BQU8sV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBSUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFvQixFQUFFLFNBQWlCLEVBQUUsVUFBa0I7UUFDaEYsZ0NBQWdDO1FBQ2hDLElBQUksVUFBVSxLQUFLLENBQUMsRUFBRTtZQUNsQixJQUFJLFNBQVMsS0FBSyxLQUFLLElBQUksU0FBUyxLQUFLLEtBQUssRUFBRTtnQkFDNUMsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdEI7WUFDRCxPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QjtRQUVELElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxVQUFVLEtBQUssQ0FBQyxFQUFFO1lBQ2xCLGFBQWEsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEM7YUFBTTtZQUNILGFBQWEsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEM7UUFDRCwrQkFBK0I7UUFDL0IsSUFBSSxTQUFTLEtBQUssS0FBSyxJQUFJLFNBQVMsS0FBSyxLQUFLLElBQUksU0FBUyxLQUFLLEtBQUssSUFBSSxTQUFTLEtBQUssS0FBSyxFQUFFO1lBQzFGLE9BQU8sQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDakM7UUFDRCxjQUFjO1FBQ2QsSUFBSSxTQUFTLEtBQUssS0FBSyxJQUFJLFNBQVMsS0FBSyxLQUFLLEVBQUU7WUFDNUMsSUFBSSxHQUFHLEdBQUcsV0FBVyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pELDBEQUEwRDtZQUMxRCxZQUFZLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDeEMsSUFBSSxZQUFZLEdBQUcsS0FBSyxFQUFFO2dCQUN0QixPQUFPLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ2pDO1lBQ0QsT0FBTyxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQztTQUN4QztRQUNELFVBQVU7UUFDVixJQUFJLFNBQVMsS0FBSyxLQUFLLEVBQUU7WUFDckIsSUFBSSxVQUFVLEtBQUssQ0FBQyxFQUFFO2dCQUNsQixZQUFZLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixPQUFPLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQyxDQUFDO2FBQ3hDO1lBQ0QsWUFBWSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixPQUFPLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsVUFBVTtRQUNWLFlBQVksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsT0FBTyxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBcUIsRUFBRSxTQUFxQixFQUFFLFNBQWlCO1FBQ3RGLElBQUksV0FBVyxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkQsSUFBSSxXQUFXLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2RCxJQUFJLFFBQVEsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDekUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3BELElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUN6RSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDcEQsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzdCLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwQztRQUNELE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDO0NBQ0o7QUF2Y0Qsa0NBdWNDIn0=