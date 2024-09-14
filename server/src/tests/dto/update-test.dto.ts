import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTestDto } from './create-test.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateTestDto extends PartialType(CreateTestDto) {
    
    @IsOptional()
    @ApiProperty()
    name?: string;

    @IsOptional()
    @ApiProperty()
    description?: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({
      example: true,
      required: false,
    })
    isActive?: boolean;
}
