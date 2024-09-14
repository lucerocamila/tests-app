import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateTestDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({
    minLength: 1,
    description: 'Test name',
    example: 'Transformation Leadership Test',
  })
  name: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({
    minLength: 1,
    description: 'Test purpose description',
    example:
      'Transformational leadership is an approach for getting your followers to give their best efforts, deliver better quality and service, generate more creative ideas, exhibit more mental toughness, and strive for bigger goals.',
  })
  description: string;
}
