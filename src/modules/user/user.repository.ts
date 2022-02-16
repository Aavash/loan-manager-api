import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/User.entity';
import * as argon from 'argon2';
import { UserRegistrationDTO } from './dtos/userRegistration.dto';
import { LoginPayloadDto } from './dtos/loginPayload.dto';
import { SetPasswordDto } from './dtos/setPassword.dto';


@EntityRepository(User)
export class UserRepository extends Repository<User> {

	async createUser(userCreate: UserRegistrationDTO) {
    const { full_name, mobile_number, email, mobile_number_ext } = userCreate;


    const user = await this.save({
      full_name,
      email,
      mobile_number,
      mobile_number_ext,
      is_completely_registered: true
    });



    if (user){
    const pwdHash = await argon.hash(userCreate.password);

    await this.save(
      {
        id: user.id,
        password: pwdHash,
        is_password_set: true
      })}

    return user
	}


  async setPassword(passwordDto: SetPasswordDto) {
	  const { mobile_number, mobile_number_ext } = passwordDto;

    const user = await this.findOne({ mobile_number, mobile_number_ext } );

    if (user){
    const pwdHash = await argon.hash(passwordDto.password);

    await this.save(
      {
        id: user.id,
        password: pwdHash,
        is_password_set: true
      })}

    return user
	}

  async authenticateUser(loginCredentialsDto: LoginPayloadDto): Promise<User>{
    const { mobile_number, mobile_number_ext, password } = loginCredentialsDto;
    const user = await this.findOne({ mobile_number, mobile_number_ext });
    if (user && await argon.verify(user.password, password) && user.is_active){
      return user
    } else {
      return null
    }

  }

}