import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsJSON, IsObject, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateResultDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    minLength: 1,
    description: 'Test result description',
    example: 'You are a ...',
  })
  description: string;
  
  @IsObject()
  @ApiProperty({
    type: JSON,
    description: 'Result detail in JSON object',
    example: [{
      type: "influencia idealizada",
      name: "influencia idealizada",
      description: "el líder se comporta de manera admirable y ética, y demuestra convicciones que hacen que los seguidores se identifiquen con él y con sus valores",
      imagePath: 'imagePath'
    },
    {
      type: "motivación inspiracional",
      name: "motivación inspiracional",
      description: "el líder articula una visión de futuro que es compartida y atractiva para los seguidores, y les transmite optimismo y confianza en el logro de los objetivos",
      imagePath: 'imagePath'
    },
    {
      type: "estimulación intelectual",
      name: "estimulación intelectual",
      description: "el líder desafía las suposiciones, estimula y alienta la creatividad de los seguidores, y les provee un marco para ver cómo se conectan sus acciones con la misión de la organización.",
      imagePath: 'imageOath'
    },
    {
      type: "atención personal e individual",
      name: "atención personal e individual",
      description: "el líder asiste a cada seguidor según sus necesidades y actúa como un mentor o coach, y aprecia la contribución de cada individuo al equipo. El líder fomenta el desarrollo y el empoderamiento de los seguidores, y mejora su autoestima y auto-realización.",
      imagePath: 'imagePath'
    }
  ]})
  result_detail: object;

  @IsString()
  @MinLength(1)
  @ApiProperty({
    minLength: 1,
    description: 'User id',
    example: 'dd8a8545454a5dsds845',
  })
  userId: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({
    minLength: 1,
    description: 'Test id',
    example: 'dd8a8545454a5dsds845',
  })
  testId: string;
}
