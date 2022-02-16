import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserAuthService } from '../services/userAuth.service';
import { SetPasswordDto } from '../dtos/setPassword.dto';
import { LoginPayloadDto } from '../dtos/loginPayload.dto';

@Controller('user-auth')
export class UserAuthController {

  constructor(
    private userAuthService: UserAuthService
  ) {}

  @Post('/set-password/')
  async setPassword(@Body(ValidationPipe) authCredentialsDto: SetPasswordDto): Promise<{ message }> {
    return await this.userAuthService.setPassword(authCredentialsDto)
  }
  
  @Post('/signin/')
  signIn(@Body(ValidationPipe) loginCredentialsDto: LoginPayloadDto): Promise<{access_token, expires_in}> {
  return this.userAuthService.signIn(loginCredentialsDto)
  }

}


