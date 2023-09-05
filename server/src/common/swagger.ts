import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as packageConfig from '../../package.json';
import { INestApplication } from '@nestjs/common';

export const generateDocument = (app: INestApplication) => {
    const options = new DocumentBuilder()
        .setTitle(packageConfig.name) // 设置文档标题
        .setDescription(packageConfig.description) // 设置描述
        .setVersion(packageConfig.version) // 设置版本号
        .addBearerAuth(
            {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization'
            },
            'Authorization'
        ) // 允许tonken鉴权
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/swagger', app, document);
};
