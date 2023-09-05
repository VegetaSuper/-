import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function checkDatabase() {
    try {
        await prisma.$connect();
    } catch (error) {
        console.log(`无法连接到数据库:${error}
                        　  ▃▆█▇▄▖
                　 　 　 ▟◤▖　　　◥█▎
                　    ◢◤　 ▐　　　 　▐▉
                　 ▗◤　　　▂　▗▖　　▕█▎
                　◤　▗▅▖◥▄　▀◣　　█▊
                ▐　▕▎◥▖◣◤　　　　◢██
                █◣　◥▅█▀　　　　▐██◤
                ▐█▙▂　　     　◢██◤
                ◥██◣　　　　◢▄◤
                　　▀██▅▇▀`);
    } finally {
        await prisma.$disconnect();
    }
}

checkDatabase();
export default prisma;
