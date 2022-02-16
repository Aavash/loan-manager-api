import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { UserJwtStrategy } from '../user/user.jwtStrategy';


@Module({
  imports: [
    TypeOrmModule.forFeature([Loan]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [LoanController],
  providers: [LoanService, UserJwtStrategy]
})
export class LoanModule {}
