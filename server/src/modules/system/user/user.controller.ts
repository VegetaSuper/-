import { Controller, Get, Post, Body, Param, Query, ParseIntPipe, Req } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto, RecordUserDto, UpdateUserDto, DeleteUserDto } from './user.dto';
import { Request } from 'express';

@ApiTags('用户')
@Controller('system/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({
        summary: '获取用户列表'
    })
    @Get()
    async findList(@Query() param: RecordUserDto) {
        return this.userService.findList(param);
    }

    @ApiOperation({
        summary: '获取单个用户'
    })
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id);
    }

    @ApiOperation({
        summary: '新增用户'
    })
    @Post('/create')
    async create(@Body() data: CreateUserDto) {
        return this.userService.create(data);
    }

    @ApiOperation({
        summary: '修改用户'
    })
    @Post('/update')
    async update(@Body() data: UpdateUserDto) {
        return this.userService.update(data);
    }

    @ApiOperation({
        summary: '删除用户'
    })
    @Post('/delete')
    async remove(@Body() data: DeleteUserDto) {
        const userIds = data.ids.split(',').map((item) => Number(item));
        return this.userService.remove(userIds);
    }

    @ApiOperation({
        summary: '根据token获取用户信息'
    })
    @Get('/getProfile')
    async getProfile(@Req() request: Request) {
        return this.userService.getProfile(request.headers.authorization);
    }
}
