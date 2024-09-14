import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'User email',
    example: 'usertest@gmail.com',
    type: String,
    format: 'email',
  })
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @ApiProperty({
    description: 'User password',
    type: String,
    format: 'password',
    example: 'myPassword123',
    minLength: 6,
    maxLength: 50,
  })
  password: string;
}
