import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'; // import TypeOrmModule
import { UserModule } from './user/user.module';
import { dbConfig } from './config/db/dbconfig';
import { IsletmelerModule } from './isletmeler/isletmeler.module';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';
import { UploadController } from './upload/upload.controller';
import { UploadService } from './upload/upload.service';
import { Gorseller } from './isletmeler/entities/gorseller.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dbConfig()), // add there
    UserModule,
    IsletmelerModule,
    UploadModule,
    TypeOrmModule.forFeature([Gorseller]),
  ],
  controllers: [AppController, UploadController],
  providers: [AppService, UploadService],
})
export class AppModule {}
