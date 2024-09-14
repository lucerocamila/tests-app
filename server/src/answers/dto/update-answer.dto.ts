import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAnswerDto } from './create-answer.dto';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAnswerDto extends PartialType(CreateAnswerDto) {
  @IsString()
  description?: string;

  @IsNumber()
  points?: number;

  @IsBoolean()
  isEmpty?: boolean;

  @IsString()
  questionId?: string;
  
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: true,
    required: false,
  })
  isActive?: boolean;
}
