import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MinLength, MaxLength } from 'class-validator';
export class RegisterDto {
    @ApiProperty({ example: '1234@qq.com' })
    @Matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        { message: '邮箱格式不正确' }
    )
    @IsNotEmpty({ message: '请输入邮箱' })
    email: string;

    @ApiProperty({ example: '123456' })
    @MinLength(6, { message: '密码长度不能小于6位' })
    @MaxLength(20, { message: '密码长度不能大于20位' })
    @IsNotEmpty({ message: '请输入密码' })
    password: string;
}
