import { v4 as uuidv4 } from 'uuid';
import { bucket } from 'src/config/firebase/firebase.config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gorseller } from 'src/isletmeler/entities/gorseller.entity';
import { GorsellerDTO } from 'src/dtos/isletmeGorsel.dto';

export class UploadService {
  constructor(
    @InjectRepository(Gorseller)
    private readonly gorsellerRepository: Repository<Gorseller>,
  ) {}

  // for the Upload files to firebase cloud storage service.
  private async uploadFileToFirebase(file: any): Promise<string> {
    const uniqueFilename = uuidv4() + '_' + file.originalname;
    const fileUpload = bucket.file(uniqueFilename);
    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });
    await new Promise<void>((resolve, reject) => {
      stream.on('finish', () => {
        resolve();
      });

      stream.on('error', (error) => {
        reject(error);
      });

      stream.end(file.buffer);
    });

    const fileReference = bucket.file(uniqueFilename);
    await fileReference.makePublic();
    const url = fileUpload.publicUrl();
    return url;
  }
  // for create a row at db
  private addDB = (data: GorsellerDTO) => {
    const newRecord = this.gorsellerRepository.create(data);
    return this.gorsellerRepository.save(newRecord);
  };

  // for the Upload a single file
  async uploadFile(file: any): Promise<string> {
    const url = this.uploadFileToFirebase(file);
    return url;
  }

  // for the Upload multiple files
  async uploadMultipleFiles(files: any[]): Promise<string[]> {
    const urls: string[] = [];
    await Promise.all(
      files?.map(async (file) => {
        const url = this.uploadFileToFirebase(file);
        urls.push(await url);
      }),
    );
    return urls;
  }

  // for the Create a row in to Gorseller with isletmeId at DB
  async addImagetoDB(isletmeId: string, files: any[]): Promise<string[]> {
    const urls: string[] = [];
    await Promise.all(
      files?.map(async (file) => {
        const url = await this.uploadFileToFirebase(file);
        urls.push(url);
        const data: GorsellerDTO = {
          isletme: isletmeId,
          photoName: 'Görsel Adı',
          url: url,
          description: 'Görsel Açıklaması',
        };
        await this.addDB(data);
      }),
    );

    return urls;
  }
}
