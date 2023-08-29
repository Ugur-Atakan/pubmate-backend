import { EntityBase } from 'src/config/entity/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Isletmeler } from './isletmeler.entity';

@Entity({ name: 'Gorseller' })
export class Gorseller extends EntityBase {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  filename: string;

  @ManyToOne(() => Isletmeler, (isletme) => isletme.gorsel)
  isletme: Isletmeler;
}
