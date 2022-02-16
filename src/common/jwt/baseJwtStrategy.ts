import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../../common/constants/jwtPayload.interface';
import { JWT_CONFIG } from '../../config/main.config';

@Injectable()
export class BaseJwtStrategy extends PassportStrategy(Strategy){
  constructor(

  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_CONFIG.secret_key,
    });
  }

  async validate(payload: JwtPayload): Promise<unknown> {
    return payload
  }
}