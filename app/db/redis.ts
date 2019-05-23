import { promisifyAll } from 'bluebird';
import * as redis from 'redis';


const port = 6379;
const reidsHost = '192.168.1.21';
const password = '123456';
type IDelAsync = (key: string | string[]) => Promise<number>;

type ISetAsync = (key: string, value: string, mode?: string, duration?: number, flag?: string) => Promise<'OK' | undefined>;

type IGetAsync = (key: string) => Promise<string>;

type IHsetAsync = (key: string, field: string, value: string) => Promise<number>;

type IHgetAsync = (key: string, field: string) => Promise<string>;

type IHgetallAsync = (key: string) => Promise<{ [key: string]: string }>;

interface OverloadedKeyCommand<T, U> {
    (key: string, arg1: T, arg2?: T, arg3?: T, arg4?: T, arg5?: T, arg6?: T): Promise<U>;
    (key: string, arg1: T | T[]): Promise<U>;
    (key: string, ...args: Array<T>): Promise<U>;
    // (...args: Array<string | T>): Promise<U>;
}
type IHexistsAsync = (key: string, field: string) => Promise<number>;

type IHincrbyAsync = (key: string, field: string, increment: number) => Promise<number>;

type IHincrbyfloatAsync = (key: string, field: string, increment: number) => Promise<string>;

type IHkeysAsync = (key: string) => Promise<string[]>;

type IHlenAsync = (key: string) => Promise<number>;

type IHmsetAsync = (key: string, arg1: { [key: string]: string }) => Promise<'OK'>;

type IHvalsAsync = (key: string) => Promise<string[]>;


interface OverloadedLastCommand<T1, T2, U> {
    (arg1: T1, arg2: T1, arg3: T1, arg4: T1, arg5: T1, arg6: T2): Promise<U>;
    (arg1: T1, arg2: T1, arg3: T1, arg4: T1, arg5: T2): Promise<U>;
    (arg1: T1, arg2: T1, arg3: T1, arg4: T2): Promise<U>;
    (arg1: T1, arg2: T1, arg3: T2): Promise<U>;
    (arg1: T1, arg2: T2 | Array<T1 | T2>): Promise<U>;
    (args: Array<T1 | T2>): Promise<U>;
    (...args: Array<T1 | T2>): Promise<U>;
}

type IBrpoplpushAsync = (source: string, destination: string, timeout: number) => Promise<string | null>;

type IindexAsync = (key: string, index: number) => Promise<string>;

type ILinsertAsync = (key: string, dir: 'BEFORE' | 'AFTER', pivot: string, value: string) => Promise<string>;

type ILlenAsync = (key: string) => Promise<number>;

type ILpopAsync = (key: string) => Promise<string>;

type ILpushxAsync = (key: string, value: string) => Promise<number>;

type ILrangeAsync = (key: string, start: number, stop: number) => Promise<string[]>;

type ILremAsync = (key: string, count: number, value: string) => Promise<number>;

type ILsetAsync = (key: string, index: number, value: string) => Promise<'OK'>;

type ILtrimAsync = (key: string, start: number, stop: number) => Promise<'OK'>;

type IRpopAsync = (key: string) => Promise<string>;

type IRpoplpushAsync = (source: string, destination: string) => Promise<string>;

type IRpushxAsync = (key: string, value: string) => Promise<number>;

type IBpopAsync = (key: string, timeout: number) => Promise<string[]>;

type IDumpAsync = (key: string) => Promise<string>;

type IKeysAsync = (pattern: string) => Promise<string[]>;
interface IBlueRedisClient extends redis.RedisClient {
    dumpAsync?: IDumpAsync;
    keysAsync?: IKeysAsync;
    delAsync?: IDelAsync;
    /**
     * key-value set
     */
    setAsync?: ISetAsync;
    /**
     * key-value set
     */
    getAsync?: IGetAsync;
    // get

    /**
     * hash set (object)
     */
    hsetAsync?: IHsetAsync;

    /**
     * hash get (object)
     */
    hgetAsync?: IHgetAsync;

    /**
     * hash get all (object)
     */
    hgetallAsync?: IHgetallAsync;

    /**
     * hash delete
     */
    hdelAsync?: OverloadedKeyCommand<string, Number>;

    /**
     * hash 检查字段是否存在
     */
    hexistsAsync?: IHexistsAsync;

    /**
     *  hash  直接操作key的value（加法）  前提value是整数
     */
    hincrbyAsync?: IHincrbyAsync;

    /**
     * hash  直接操作key的value（加法）  前提value是浮点数
     */
    hincrbyfloatAsync?: IHincrbyfloatAsync;

    /**
     * hash 获取所有的key
     */
    hkeysAsync?: IHkeysAsync;

    /**
     * hash 获取字段的数量
     */
    hlenAsync?: IHlenAsync;

    /**
     * hash 获取所有给定字段的值
     */
    hmgetAsync?: OverloadedKeyCommand<string, string[]>;

    /**
     * hash 同时将多个 field-value (域-值)对设置到哈希表 key 中。
     */
    hmsetAsync?: IHmsetAsync;

    /**
     * hash 获取所有value
     */
    hvalsAsync?: IHvalsAsync;

    // hash 迭代哈西中的键值对
    // hscanAsync?: OverloadedKeyCommand<string, [string, string[]]>;
    /**
     * list
     */


    /**
     *  list 移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止
     */
    blpopAsync?: IBpopAsync;

    /**
     *   list 移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
     */
    brpopAsync?: IBpopAsync;

    /**
     *  list 从列表中弹出一个值，将弹出的元素插入到另外一个列表中并返回它； 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
     */
    brpoplpushAsync?: IBrpoplpushAsync;

    /**
     * list 通过索引获取列表中的元素
     */
    lindexAsync?: IindexAsync;

    // list 在列表的元素前或者后插入元素
    // linsertAsync?: ILinsertAsync;

    /**
     * list 获取列表长度
     */
    llenAsync?: ILlenAsync;

    /**
     * list 移出并获取列表的第一个元素
     */
    lpopAsync?: ILpopAsync;

    /**
     * list 将一个或多个值插入到列表头部
     */
    lpushAsync?: OverloadedKeyCommand<string, number>;

    /**
     * list 将一个值插入到已存在的列表头部
     */
    lpushxAsync?: ILpushxAsync;


    /**
     * list 获取列表指定范围内的元素
     */
    lrangeAsync?: ILrangeAsync;

    /**
     * list 移除列表元素
     */
    lremAsync?: ILremAsync;

    /**
     * list 通过索引设置列表元素的值
     */
    lsetAsync?: ILsetAsync;

    /**
     * list 对一个列表进行修剪(trim)，就是说，让列表只保留指定区间内的元素，不在指定区间之内的元素都将被删除。
     */
    ltrimAsync?: ILtrimAsync;

    /**
     * list 移除列表的最后一个元素，返回值为移除的元素。
     */
    rpopAsync?: IRpopAsync;

    /**
     * list 移除列表的最后一个元素，并将该元素添加到另一个列表并返回
     */
    rpoplpushAsync?: IRpoplpushAsync;

    /**
     * list 在列表中添加一个或多个值
     */
    rpushAsync?: OverloadedKeyCommand<string, number>;

    /**
     * list 为已存在的列表添加值
     */
    rpushxAsync?: IRpushxAsync;
}

export const redisClient: IBlueRedisClient = redis.createClient(port, reidsHost, { password });
promisifyAll(redis, { suffix: 'MySuffix' });
