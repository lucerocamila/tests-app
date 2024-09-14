import { User } from 'src/auth/entities';
import { Question } from 'src/questions/entities/question.entity';
import { Result } from 'src/result/entities/result.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('test')
export class Test {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
  })
  name: string;

  @Column('text', {
    nullable: false,
  })
  description: string;

  @Column('boolean', {
    default: true,
    nullable: false,
    name: 'is_active',
  })
  isActive: boolean;

  @ManyToMany(() => User, (user) => user.test)
  user: User[];

  @OneToMany(() => Question, (question) => question.test)
  question: Question[];
  // para la demo 
  //@OneToOne(() => Result, (result) => result.test)
  @OneToMany(() => Result, (result) => result.test)
  result: Result;
}
