import { User } from 'src/auth/entities/user.entity';
import { Test } from 'src/tests/entities/test.entity';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('result')
export class Result {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: true,
  })
  description: string;

  @Column('jsonb', {
    nullable: true,
    default: {}
  })
  result_detail?: JSON;

  @ManyToOne(() => User, (user) => user.result)
  user: User;
  //para la demo un usuario puede tener muchos intentos del mismo test 
  //@OneToOne(() => Test, (test) => test.result)
  @ManyToOne(() => Test, (test) => test.result)
  @JoinColumn()
  test: Test;
}
