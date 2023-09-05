import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { generateDocument } from './common/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
    try {
        const app = await NestFactory.create<NestExpressApplication>(AppModule);
        app.useStaticAssets(join(__dirname, '../..', 'public'), {
            prefix: '/static/'
        });
        // 设置统一接口前缀
        // app.setGlobalPrefix('/api');
        // 生成文档
        generateDocument(app);
        // response header 安全帽
        app.use(helmet());
        // 跨域cors配置
        app.enableCors();
        app.use(cookieParser());
        //开启一个全局验证管道
        app.useGlobalPipes(
            new ValidationPipe({
                stopAtFirstError: true // 第一个验证规则命中后是否停止校验
            })
        );

        await app.listen(3000);
        // console.log('http://localhost:3000/api');
    } catch (error) {
        console.log('运行失败: ', error);
    }
}
bootstrap();
