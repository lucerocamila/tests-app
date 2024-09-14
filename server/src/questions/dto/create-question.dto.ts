import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({
    minLength: 1,
    description: 'Question description',
    example: 'Why I should take a ...',
  })
  description: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    minLength: 1,
    description: 'Question type',
    example: 'Why I should take a ...',
  })
  typeQuestion?: string;

  @IsString()
  @ApiProperty({
    minLength: 1,
    description: 'Question test id',
    example: '1ce8f4f1-121b-43ce-a555-38829efa862b',
  })
  testId: string;
}
