import { Company } from 'src/company/entities/company.entity';
import { Role } from './role.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Test } from 'src/tests/entities/test.entity';
import { Result } from 'src/result/entities/result.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
    nullable: false,
  })
  email: string;

  @Column('text', {
    nullable: false,
    select: false,
  })
  password: string;

  @Column('text', {
    name: 'full_name',
  })
  fullName: string;

  @Column('bool', {
    name: 'is_active',
    default: true,
    nullable: false,
  })
  isActive: boolean;

  @Column({
    length: 100,
    default: true,
    nullable: false,
  })
  createdBy: string;

  @ManyToMany(() => Test, (test) => test.user, {
    cascade: true,
  })
  @JoinTable({
    name: 'user_test',
  })
  test: Test[];

  @ManyToOne(() => Role, (role) => role.user)
  role: Role;

  @ManyToOne(() => Company, (company) => company.employees)
  company: Company;

  @OneToMany(() => Result, (result) => result.user)
  result: Result;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
