import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [context.getHandler(), context.getClass()]);
        if (isPublic) return true;

        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;

        if (!token) {
            throw new Error('请登录后再进行操作');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET
            });
            request['user'] = payload;
        } catch {
            throw new Error('令牌失效');
        }
        return true;
    }
}
