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

export class ReckonPoker {
    /**
     * 升序排列手牌(王最小)
     * @param cardList 玩家的手牌
     */
    public static sortCardList(cardList: number[][]) {
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
    public static getLaiZiCount(cardList: number[][]) {
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
    public static sumOfDifferences(cardList: number[][]): number {
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
    public static cardStatistics(cardList: number[][]) {
        let map = {};
        for (const iterator of cardList) {
            if (iterator[1] === 0) {
                continue;
            }
            if (map.hasOwnProperty(iterator[1])) {
                map[iterator[1]]++;
            } else {
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
    public static straightFlush(cardList: number[][]): boolean {
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
    public static fiveCalves(cardList: number[][]): boolean {
        let len = cardList.length;
        let sum = 0;    // 总点数
        let count = 0;  // 癞子个数
        for (let i = 0; i < len; i++) {
            if (cardList[i][1] !== 0) {
                sum += cardList[i][1];
            } else {
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
    public static bombBull(cardList: number[][]): boolean {
        let map = ReckonPoker.cardStatistics(cardList);   // 牌值:张数
        let count = ReckonPoker.getLaiZiCount(cardList);  // 癞子个数
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
    public static FortyBull(cardList: number[][]): boolean {
        let num = 0;    // 总点数
        let count = 0;  // 癞子个数
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
    public static gourdBull(cardList: number[][]): boolean {
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
    public static flushBull(cardList: number[][]): boolean {
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
    public static fiveFlowerBull(cardList: number[][]): boolean {
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
    public static straightBull(cardList: number[][]): boolean {
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
    public static whichBull(cardList: number[][]): number {
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
                        let residue = 0;    // 余数
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
    public static getCardsType(cardList: number[][], specialCard: string): number {
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
    public static getMaxCard(cardList: number[][], cardsType: number, laiziCount: number) {
        // 没有癞子，炸弹牛和葫芦牛第三张即为最大，其他牌型第五张最大
        if (laiziCount === 0) {
            if (cardsType === num14 || cardsType === num16) {
                return cardList[3];
            }
            return cardList[5];
        }

        let maxCardValue = 0;
        let maxColorValue = 0;
        if (laiziCount === 1) {
            maxColorValue = cardList[0][0];
        } else {
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
    public static compareCards(cardList1: number[][], cardList2: number[][], cardsType: number) {
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
