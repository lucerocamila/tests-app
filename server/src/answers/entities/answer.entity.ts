import { Question } from 'src/questions/entities/question.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity('answer')
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
  })
  description: string;

  @Column('int', {
    nullable: true,
  })
  points: number;

  @Column('text', {
    nullable: true,
  })
  type: string;

  @Column('boolean', {
    default: false,
    nullable: false,
    name: 'is_empty',
  })
  isEmpty: boolean;


  @Column('boolean', {
    default: true,
    nullable: false,
    name: 'is_active',
  })
  isActive: boolean;

  @ManyToOne(() => Question, (question) => question.answer)
  question: Question;
}
