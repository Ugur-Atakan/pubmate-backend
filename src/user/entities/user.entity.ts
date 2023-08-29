import { EntityBase } from 'src/config/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity({ name: 'users' }) // table name
export class User extends EntityBase {
  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  surname: string;

  @Column({ unique: true, length: 80 })
  @Index()
  email: string;

  @Column({ unique: true, length: 15 })
  @Index()
  phone: string;

  @Column()
  password: string;
}
