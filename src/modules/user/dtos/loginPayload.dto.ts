import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginPayloadDto {

    @IsString()
    @MinLength(3)
    @MaxLength(3)
    @ApiProperty()
    mobile_number_ext: string;

    @IsString()
    @MinLength(10)
    @MaxLength(10)
    @ApiProperty()
    mobile_number: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(1000)
    @ApiProperty()
    device_id: string;


    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      { message: 'Password too weak' })
    @ApiProperty()
    password: string;
}