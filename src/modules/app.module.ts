import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middleware';
import dbConfig from 'src/config/typeorm.config';
import { LoanModule } from './loan/loan.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    UserModule,
	LoanModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(LoggerMiddleware)
			.forRoutes({ path: '*', method: RequestMethod.ALL });
		// consumer
		// 	.apply(AuthMiddleWare)
		// 	.forRoutes(
		// 		{ path: '/path/', method: RequestMethod.ALL },
		// 	);
	}

}
