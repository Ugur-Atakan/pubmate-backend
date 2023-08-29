import { Module } from '@nestjs/common';
import { IsletmelerService } from './isletmeler.service';
import { IsletmelerController } from './isletmeler.controller';
import { Isletmeler } from './entities/isletmeler.entity';
import { Gorseller } from './entities/gorseller.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Isletmeler, Gorseller])],
  controllers: [IsletmelerController],
  providers: [IsletmelerService],
  exports: [IsletmelerService],
})
export class IsletmelerModule {}
