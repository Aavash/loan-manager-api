
import { join } from 'path';

import helmet from 'helmet';
import * as express from 'express';

import { NestFactory } from '@nestjs/core';
import { InternalServerExceptionFilter } from './common/filters/Internal.filter';
import { AppModule } from './modules/app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APP_PORT } from './config/main.config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
	app.setGlobalPrefix('v1');
	app.use(helmet());
	// app.use(compression());
	app.use('/media', express.static(join(__dirname, '..', 'media')));
	app.useGlobalFilters(new InternalServerExceptionFilter());
	const options = new DocumentBuilder()
	.setTitle('Loan Management Apis')
	.setDescription(
		'Loan Management Service Apis description built using swagger OpenApi. You can find out more about Swagger at http://swagger.io',
	)
	.setVersion('1.0')
	.build();
	const document = SwaggerModule.createDocument(app, options);

	SwaggerModule.setup('api', app, document);

	await await app.listen(process.env.PORT || 8000);

	Logger.log(`Server running on http://localhost:${process.env.APP_PORT}`, 'Bootstrap');}


bootstrap();
