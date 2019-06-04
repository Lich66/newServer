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
        let map = {};   // 牌值:张数
        let count = 0;  // 癞子个数
        for (const iterator of cardList) {
            if (iterator[1] === 0) {
                count++;
                continue;
            }
            if (map.hasOwnProperty(iterator[1])) {
                map[iterator[1]]++;
            } else {
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
        let map = {};
        let count = 0;
        for (const iterator of cardList) {
            if (iterator[1] === 0) {
                count++;
                continue;
            }
            if (map.hasOwnProperty(iterator[1])) {
                map[iterator[1]]++;
            } else {
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

    // 同花顺>五小牛>炸弹牛>四十牛>葫芦牛>同花牛>顺子牛>牛牛>牛九>牛八>牛七>牛六>牛五>牛四>牛三>牛二>牛一>无牛
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
        // 一个癞子
        if (cardList[0][1] === 0) {
            // 两张10以上
            if (cardList[3][1] >= 10) {
                return 10;
            }
            // 一张10以上
            if (cardList[4][1] >= 10) {
                return cardList[2][1] + cardList[3][1];
            }
            // 零张10以上
            return cardList[3][1] + cardList[4][1];
        }
        // 零个癞子 任意两张的余数等于总余数，即为牛几；不等即为无牛
        let residue = 0;    // 余数
        let len = cardList.length;
        for (let i = 0; i < len; i++) {
            if (cardList[i][1] > 10) {
                residue += 10;
                continue;
            }
            residue += cardList[i][1];
        }
        residue %= 10;
        for (let i = 0; i < len - 1; i++) {
            for (let j = i + 1; j < len; j++) {
                let cardValue1 = cardList[i][1];
                if (cardList[i][1] > 10) {
                    cardValue1 -= 10;
                }
                let cardValue2 = cardList[j][1];
                if (cardList[j][1] > 10) {
                    cardValue2 -= 10;
                }
                if ((cardValue1 + cardValue2) % 10 === residue) {
                    if (residue === 0) {
                        return 10;
                    } else {
                        return residue;
                    }
                }
            }
        }
        return 0;
        return 0;
    }
}
