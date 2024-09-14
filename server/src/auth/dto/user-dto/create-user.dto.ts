/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { validRoles } from 'src/auth/interfaces';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'User email',
    format: 'example@gmail.com',
    example: 'example@gmail.com',
    uniqueItems: true,
    minLength: 5,
  })
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  @ApiProperty({
    description: 'User password',
    minLength: 6,
    maxLength: 50,
    format: 'password',
    example: 'myPassword123',
    uniqueItems: true,
  })
  password: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'User full name',
    minLength: 1,
    example: 'John Doe',
  })
  fullName: string;

  @IsString()
  @IsOptional()
  @IsIn([validRoles.consultant, validRoles.user])
  @ApiProperty({
    description: 'pass a role title, (this field can be optional by default the role is user)',
    enum: validRoles,
    example: `${validRoles.user}`,
    default: validRoles.user,
    required: false,
  })
  roleTitle?: string;


  @IsString()
  @IsUUID()
  @IsOptional()
  @ApiProperty({
    description: 'pass uuid company (this field is optional, pass it only if this user belongs to a existing company)',
    example: 'oracle',
    required: false,
  })
  companyId?: string;

  
}
