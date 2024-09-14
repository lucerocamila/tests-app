import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({
    minLength: 1,
    description: 'Company name',
    uniqueItems: true,
    example: 'oracle',
  })
  name: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({
    minLength: 1,
    description: 'Raul',
    uniqueItems: true,
    example: 'Raul',
  })
  owner_first_name: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({
    minLength: 1,
    description: 'Fernandez',
    uniqueItems: true,
    example: 'Fernandez',
  })
  owner_last_name: string;

  @IsString()
  @ApiProperty({
    minLength: 11,
    maxLength: 20,
    description: 'Company phone number',
    format: '+56 9 XXXX-XXXX',
    example: '+56 9 9999-9999',
    uniqueItems: true,
  })
  phone: string;

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
}
