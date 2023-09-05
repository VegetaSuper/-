import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { AppService } from './app.service';
import { RegisterDto } from './app.dto';
import { Public } from 'src/common/decorator/public.decorator';

@ApiTags('其它')
@Controller('')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @ApiOperation({
        summary: '注册'
    })
    @Public()
    @Post('/register')
    async register(@Body() data: RegisterDto) {
        return this.appService.register(data);
    }

    @ApiOperation({
        summary: '登录'
    })
    @Public()
    @Post('/login')
    async login(@Body() data: RegisterDto) {
        return this.appService.login(data);
    }
}
