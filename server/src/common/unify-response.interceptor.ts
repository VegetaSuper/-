// 响应拦截器
import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { getRequestHeaderInfo } from './utils';

@Injectable()
export default class UnifyResponseInterceptor implements NestInterceptor {
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();

        const req = ctx.getRequest<Request>();

        return next.handle().pipe(
            map((res) => {
                this.logger.info('response', {
                    responseData: res,
                    req: getRequestHeaderInfo(req)
                });
                return {
                    code: 0,
                    data: res.data,
                    message: res.message || '操作成功'
                };
            })
        );
    }
}
