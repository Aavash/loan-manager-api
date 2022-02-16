import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../../common/constants/jwtPayload.interface';
import { getConnection } from 'typeorm';
import { User } from './entities/User.entity';
import { BaseJwtStrategy } from '../../common/jwt/baseJwtStrategy';

@Injectable()
export class UserJwtStrategy extends BaseJwtStrategy{

  async validate(payload: JwtPayload): Promise<User> {
    const { idx } = payload;
    const employerRepository = await getConnection().getRepository(User);
    const user = await employerRepository.findOne({ where: { idx: idx } });

    if (!user) {
      throw new UnauthorizedException()
    }
    delete user.password
    delete user.balance
    // else if (!user.is_superadmin){
    //   throw new UnauthorizedException()
    // }

    return user
  }
}