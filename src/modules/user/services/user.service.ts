import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegistrationDTO } from '../dtos/userRegistration.dto';
import { getUserJwtToken } from 'src/common/jwt/getUserJwtToken.helper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    private jwtService:JwtService
  ) {}

  async userRegistration(dto: UserRegistrationDTO){
    const user = this.userRepository.createUser(dto)
    const { access_token, expires_in } = await getUserJwtToken(user, this.jwtService);

    return { 'message': 'user Created Successfully', access_token, expires_in }
    }
  }
