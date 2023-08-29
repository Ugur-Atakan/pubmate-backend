import { EntityBase } from 'src/config/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity({ name: 'cafe' }) // table name
export class Cafe extends EntityBase {
  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  adress: string;

  @Column({ unique: true, length: 80 })
  @Index()
  email: string;

  @Column({ unique: true, length: 15 })
  @Index()
  phone: string;

  @Column()
  type: string;

  @Column()
  isActive: boolean;
}
