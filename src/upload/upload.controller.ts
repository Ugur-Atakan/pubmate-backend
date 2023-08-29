import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/single')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<any> {
    const url = await this.uploadService.uploadFile(file);
    return url;
  }
  @Post('/multi')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadMultipleFiles(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<string[]> {
    const urls = await this.uploadService.uploadMultipleFiles(files);
    return urls;
  }
}
