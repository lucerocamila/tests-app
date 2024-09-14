import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateQuestionDto } from './create-question.dto';
import { Test } from 'src/tests/entities/test.entity';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsOptional()
  testId?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: true,
    required: false,
  })
  isActive?: boolean;
}
