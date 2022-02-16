import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SetPasswordDto } from '../dtos/setPassword.dto';
import { LoginPayloadDto } from '../dtos/loginPayload.dto';
import { getUserJwtToken } from '../../../common/jwt/getUserJwtToken.helper';


@Injectable()
export class UserAuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    private jwtService:JwtService
  ) {}

  async setPassword(setPasswordDto: SetPasswordDto): Promise<{ message }> {
    if (setPasswordDto.password !== setPasswordDto.confirm_password){
      throw new HttpException('Password is not valid', HttpStatus.BAD_REQUEST)
    }

    const user = await this.userRepository.setPassword(setPasswordDto);

    if (user) {
      return { message: 'Password was set successfully' };
    } else {
      throw new HttpException('Invalid or Expired Token', HttpStatus.BAD_REQUEST)
    }

  }

  async signIn(loginCredentialsDto: LoginPayloadDto): Promise<{access_token, expires_in}> {

    const user = await this.userRepository.authenticateUser(loginCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const { access_token, expires_in } = await getUserJwtToken(user, this.jwtService);

    return { access_token, expires_in }
  }
}