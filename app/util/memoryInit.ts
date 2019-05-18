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
    const basearr: { Index: string; Key: string; Text: string; Value: string }[] = data;

    for (const iterator of basearr) {
       await redisClient.hsetAsync(memory.base, iterator.Key, iterator.Value);
    }
}

