import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Cafe } from './entities/cafe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cafe])], // add there
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
