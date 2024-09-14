import { User } from 'src/auth/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 100,
    nullable: false,
    unique: true,
    name: 'company_name',
  })
  name: string;

  @Column({
    length: 100,
    nullable: false,
    unique: true,
    name: 'owner_first_name',
  })
  owner_first_name: string;

  @Column({
    length: 100,
    nullable: false,
    unique: true,
    name: 'owner_last_name',
  })
  owner_last_name: string;

  @Column({
    length: 100,
    nullable: false,
    unique: true,
    name: 'owner_phone',
  })
  phone: string;

  @Column({
    length: 100,
    nullable: false,
    unique: true,
    name: 'owner_email',
  })
  email: string;

  @Column({
    default: true,
    name: 'is_active',
    type: 'boolean',
    nullable: false,
  })
  isActive: boolean;

  @Column({
    length: 100,
    default: true,
    nullable: false,
  })
  createdBy: string;

  @OneToMany(() => User, (employees) => employees.company)
  employees: User[];
}
