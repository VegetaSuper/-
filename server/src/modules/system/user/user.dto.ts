import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, Matches, MinLength, MaxLength, IsOptional } from 'class-validator';

export class RecordUserDto {
    @ApiProperty({ example: 1, required: false })
    @Transform(({ value }) => parseInt(value))
    page: number;

    @ApiProperty({ example: 10, required: false })
    @Transform(({ value }) => parseInt(value))
    pageSize: number;

    @ApiProperty({ example: '', required: false })
    name: string;

    @ApiProperty({ example: '', required: false })
    email: string;
}
export class CreateUserDto {
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

    @ApiProperty({ example: 'Jams Ma Bond', required: false })
    @IsOptional()
    @MinLength(4, { message: '姓名长度不能小于4位' })
    @MaxLength(20, { message: '姓名长度不能大于20位' })
    name: string;

    @ApiProperty({ example: '1', required: false })
    roleIds: string;
}

export class UpdateUserDto extends CreateUserDto {
    @IsNotEmpty({ message: '用户ID不能为空' })
    id: any;
}

export class DeleteUserDto {
    @ApiProperty({ example: '' })
    @IsNotEmpty({ message: '请填写要删除的用户ID' })
    ids: string;
}
