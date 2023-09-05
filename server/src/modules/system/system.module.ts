// system.module.ts

import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module'; // 替换为实际的用户模块路径

@Module({
    imports: [UserModule]
})
export class SystemModule {}
