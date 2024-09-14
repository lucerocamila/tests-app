import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @ApiProperty({
    example: 'user',
    description: 'Role title',
    uniqueItems: true,
    minLength: 1,
    maxLength: 50,
    default: 'user',
    nullable: false,
    required: true,
    type: String,
  })
  title: string;
}
