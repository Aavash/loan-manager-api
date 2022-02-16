import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';
import { UserRegistrationDTO } from '../dtos/userRegistration.dto';

@ApiTags('User Profile creation')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/user-register/')
  async userRegistration(@Body(ValidationPipe) dto: UserRegistrationDTO) {
    return await this.userService.userRegistration(dto)
  }

  @Post('/link-third-party-login/')
  async linkThirdPartyLogin(@Body(ValidationPipe) dto: UserRegistrationDTO) {
  return await this.userService.userRegistration(dto)
  }
}
