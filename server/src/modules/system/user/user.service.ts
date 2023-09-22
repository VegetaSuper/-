import { Injectable } from '@nestjs/common';
import prisma from 'src/common/prisma';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, UpdateUserDto, RecordUserDto } from './user.dto';
const userSelect = {
    id: true,
    email: true,
    name: true,
    profile: true
};
@Injectable()
export class UserService {
    constructor(private readonly jwtService: JwtService) {}

    async create(data: CreateUserDto) {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email }
        });
        if (existingUser) throw new Error('用户已存在');

        // 设置角色
        const userRoles = data.roleIds
            ? data.roleIds.split(',').map((roleId) => ({ id: parseInt(roleId) }))
            : { id: parseInt(process.env.DEFAULT_ROLE_ID) };

        await prisma.user.create({
            data: {
                ...data,
                roles: {
                    connect: userRoles
                }
            }
        });
        return '';
    }

    async findList(param: RecordUserDto) {
        const { page = 1, pageSize = 10, email, name } = param;

        const list = await prisma.user.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            where: {
                email: {
                    contains: email
                },
                name: {
                    contains: name
                }
            },
            select: userSelect,
            orderBy: { id: 'asc' }
        });

        const total = await prisma.user.count();

        return {
            data: {
                page,
                pageSize,
                total,
                list
            }
        };
    }

    async findOne(id: number) {
        const data = await prisma.user.findUnique({
            where: { id },
            select: {
                ...userSelect,
                roles: {
                    select: {
                        id: true
                    }
                }
            }
        });
        return {
            data
        };
    }

    async update(data: UpdateUserDto) {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email }
        });
        if (existingUser) throw new Error('具有此电子邮件的用户已存在');
        await prisma.user.update({
            where: { id: data.id },
            data: {
                ...data
            }
        });
        return {
            message: ''
        };
    }

    async remove(userIds: number[]) {
        try {
            await prisma.user.deleteMany({
                where: {
                    id: {
                        in: userIds
                    }
                }
            });

            return '';
        } catch (error) {
            return {
                message: '用户删除失败',
                error
            };
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
