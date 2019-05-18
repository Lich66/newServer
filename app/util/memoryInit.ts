import * as Sequelize from 'sequelize';

import { redisClient } from '../db/redis';
import { Bullfight_BaseDB } from '../models/Bullfight_BaseDB';
import { memory } from './memoryConfig';
// const Op = Sequelize.Op;
const Op = Sequelize.Op;
export async function baseInit() {
    const data = await Bullfight_BaseDB.findAll({
        where: {
            index: {
                [Op.regexp]: '\.'
            }
        }
    });
    const base: { index: string; PlayerStartGemsNum: string; RoomStartID: string; ClubStartID: string } = data[0];
    for (const key in base) {
        if (base.hasOwnProperty(key)) {
            redisClient.hsetAsync(memory.base, key, base[key]);
        }
    }
}

