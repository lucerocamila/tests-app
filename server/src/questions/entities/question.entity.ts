import { Answer } from 'src/answers/entities/answer.entity';
import { Test } from '../../tests/entities/test.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity('question')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
  })
  description: string;

  @Column('text', {
    nullable: true,
    name: 'type_question',
  })
  typeQuestion: string;

  @Column('boolean', {
    default: true,
    nullable: false,
    name: 'is_active',
  })
  isActive: boolean;

  @ManyToOne(() => Test, (test) => test.question)
  test: Test;

  @OneToMany(() => Answer, (answer) => answer.question)
  answer: Answer[];
}
