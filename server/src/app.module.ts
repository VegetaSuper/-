import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

import UnifyExceptionFilter from './common/uinify-exception.filter';
import UnifyResponseInterceptor from './common/unify-response.interceptor';
import logger from './common/logger.middleware';
import { JwtAuthGuard } from './common/guards/auth.guard';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SystemModule } from './modules/system/system.module';

@Module({
    imports: [
        WinstonModule.forRoot({
            transports: [
                new winston.transports.DailyRotateFile({
                    dirname: `logs`, // 日志保存的目录
                    filename: '%DATE%.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值。
                    datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
                    zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
                    maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
                    maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
                    // 记录时添加时间戳信息
                    format: winston.format.combine(
                        winston.format.timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss'
                        }),
                        winston.format.json()
                    )
                })
            ]
        }),
        SystemModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET // 替换为您自己的密钥
        })
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        },
        // 应用全局过滤器
        {
            provide: APP_FILTER,
            useClass: UnifyExceptionFilter
        },
        // 应用拦截器
        {
            provide: APP_INTERCEPTOR,
            useClass: UnifyResponseInterceptor
        },
        AppService
    ]
})
export class AppModule {
    // 应用全局中间件
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(logger).forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
