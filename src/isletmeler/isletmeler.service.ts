import { Injectable } from '@nestjs/common';
import { Isletmeler } from './entities/isletmeler.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class IsletmelerService extends TypeOrmCrudService<Isletmeler> {
  constructor(@InjectRepository(Isletmeler) repo: Repository<Isletmeler>) {
    super(repo);
  }
}
