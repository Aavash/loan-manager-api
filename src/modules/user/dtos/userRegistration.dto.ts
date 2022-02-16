import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength, IsOptional, IsUUID, IsNotEmpty, Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UserRegistrationDTO {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  full_name: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  mobile_number: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  mobile_number_ext: string;

  @ApiProperty()
  @IsEmail()
  @MinLength(3)
  @MaxLength(50)
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(1000)
  @ApiProperty()
  device_id: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  { message: 'Password too weak. Must contain an uppercase, letter and special character' })
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'Password too weak. Must contain an uppercase, letter and special character' })
  @ApiProperty()
  confirm_password: string;

}