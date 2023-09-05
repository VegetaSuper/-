import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import prisma from 'src/common/prisma';
import { encryptData, decryptData } from './common/crypto';
import { RegisterDto } from './app.dto';
@Injectable()
export class AppService {
    constructor(private readonly jwtService: JwtService) {}

    async register(data: RegisterDto) {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email }
        });
        if (existingUser) throw new Error('具有此电子邮件的用户已存在');

        // 设置默认角色
        const userRoles = { id: parseInt(process.env.DEFAULT_ROLE_ID) };

        data.password = encryptData(data.password, process.env.PASSWORD_SECRET);

        await prisma.user.create({
            data: {
                ...data,
                roles: {
                    connect: userRoles
                }
            }
        });
        return {
            message: '注册成功'
        };
    }

    async login(data: RegisterDto) {
        // 验证用户凭据（用户名、密码等）
        const user = await prisma.user.findUnique({
            where: { email: data.email }
        });
        if (!user) throw new Error('用户不存在');
        const password = decryptData(user.password, process.env.PASSWORD_SECRET);
        if (password != data.password) throw new Error('用户密码错误');

        // 生成令牌和刷新令牌
        const accessToken = await this.jwtService.signAsync({ email: user.email, id: user.id }, { expiresIn: '0.5h' });
        const refreshToken = await this.jwtService.signAsync({ email: user.email, id: user.id }, { expiresIn: '7d' });

        return {
            data: {
                accessToken,
                refreshToken
            },
            message: '登录成功'
        };
    }

    async refresh(token: string) {
        try {
            const data = this.jwtService.verify(token);

            const user = await prisma.user.findUnique({
                where: { id: data.id }
            });

            // 生成令牌和刷新令牌
            const accessToken = await this.jwtService.signAsync(
                { email: user.email, id: user.id },
                { expiresIn: '12h' }
            );
            const refreshToken = await this.jwtService.signAsync({ email: user.email }, { expiresIn: '7d' });

            return {
                data: {
                    accessToken,
                    refreshToken
                },
                message: '登录成功'
            };
        } catch (error) {
            throw new NotFoundException('令牌已过期，请重新登录');
        }
    }

    async getProfile(token: string) {
        const data = this.jwtService.verify(token);
        const user = await prisma.user.findUnique({
            where: { id: data.id }
        });
        delete user.password;
        delete user.createdAt;
        delete user.updatedAt;

        return {
            data: user
        };
    }
}
