// import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  email?: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  fullName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'pass uuid test (this field is optional, pass it only if you want to assing a test to this user)',
    example: 'oracle',
    required: false,
  })
  testId?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: true,
    required: false,
  })
  isActive?: boolean;
}
