## Installation

```bash
pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov


```

## prisma

```bash
# 初始化数据库
npx prisma migrate dev

# 更新 prisma client
npx prisma generate

# 打开数据库看板
npx prisma studio
```

## NestJS 内置的异常过滤器

BadRequestException — 400
UnauthorizedException — 401
ForbiddenException — 403
NotFoundException — 404
NotAcceptableException — 406
RequestTimeoutException — 408
ConflictException — 409
GoneException — 410
PayloadTooLargeException — 413
UnsupportedMediaTypeException — 415
UnprocessableEntityException — 422
InternalServerErrorException — 500
NotImplementedException — 501
BadGatewayException — 502
ServiceUnavailableException — 503
GatewayTimeoutException — 504
