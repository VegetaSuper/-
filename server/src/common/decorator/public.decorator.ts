//  /src/common/decorator/public.decorator.ts
import { SetMetadata } from '@nestjs/common';
// 无需校验的接口
export const Public = () => SetMetadata('isPublic', true);
