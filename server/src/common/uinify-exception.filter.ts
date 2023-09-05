// 异常过滤器
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Response, Request } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { getRequestHeaderInfo } from './utils';

@Catch()
export default class UnifyExceptionFilter implements ExceptionFilter {
    // 注入日志服务相关依赖
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp(); // 获取当前执行上下文
        const res = ctx.getResponse<Response>(); // 获取响应对象
        const req = ctx.getRequest<Request>(); // 获取请求对象
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        let message: any = exception.message;
        if (exception instanceof HttpException) {
            const response = exception.getResponse();

            if (typeof response === 'string') {
                message = response;
            } else if (typeof response === 'object' && response && 'message' in response) {
                message = response.message;
            } else {
                message = 'Internal Server Error';
            }
        }

        // 记录日志（错误消息，错误码，请求信息等）
        this.logger.error(message, {
            status,
            req: getRequestHeaderInfo(req)
            // stack: exception.stack,
        });

        res.status(status).json({ code: status, message: message });
    }
}
