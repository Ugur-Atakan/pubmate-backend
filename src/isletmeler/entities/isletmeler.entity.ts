import { EntityBase } from 'src/config/entity/base.entity';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Gorseller } from './gorseller.entity';

@Entity({ name: 'isletmeler' })
export class Isletmeler extends EntityBase {
  @Column({ length: 50 })
  isletmeAdi: string;

  @Column()
  isletmeAcikAdresi: string;

  @Column({ length: 11 })
  isletmeTelefonu: string;

  @Column()
  isletmeTipi: string;

  @Column({ nullable: true, default: 0 })
  isletmePuani: number;

  @Column()
  isletmeWebSitesi: string;

  @Column({ unique: true, length: 90 })
  @Index()
  email: string;

  @OneToMany(() => Gorseller, (gorsel) => gorsel.isletme)
  gorsel: Gorseller[];
}
