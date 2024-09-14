import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({
    minLength: 1,
    description: 'Answer full description',
    example: 'Are you a ...?',
  })
  description: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    minLength: 1,
    description: 'Total points associated to this answer',
    example: 1,
  })
  points: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    minLength: 1,
    description: 'Answer type description',
    example: 'S+',
  })
  type: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    minLength: 1,
    description: 'Is the answer empty?',
    example: 'true',
  })
  isEmpty: boolean;

  @IsString()
  @MinLength(1)
  @ApiProperty({
    minLength: 1,
    description: 'Question test id',
    example: '1ce8f4f1-121b-43ce-a555-38829efa862b',
  })
  questionId: string;
}
