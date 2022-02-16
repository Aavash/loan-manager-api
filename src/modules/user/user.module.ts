import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthController } from './controllers/userAuth.controller';
import { UserAuthService } from './services/userAuth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from './user.repository';
import { JWT_CONFIG } from '../../config/main.config';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: JWT_CONFIG.secret_key,
      signOptions: {
        expiresIn: JWT_CONFIG.expiry,
      }
    }),
  ],
  controllers: [UserAuthController, UserController],
  providers: [UserAuthService, UserService]
})
export class UserModule {}
