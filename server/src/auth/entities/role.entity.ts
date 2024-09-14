import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({
  name: 'role',
})
export class Role {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('text', {
    unique: true,
    nullable: false,
    default: 'user',
  })
  title: string;

  @Column('boolean', {
    default: true,
    nullable: false,
    name: 'is_active',
  })
  isActive: boolean;

  @OneToMany(() => User, (user) => user.role)
  user: User;
}
