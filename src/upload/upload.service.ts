import { v4 as uuidv4 } from 'uuid';
import { bucket } from 'src/config/firebase/firebase.config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gorseller } from 'src/isletmeler/entities/gorseller.entity';

export class UploadService {
  constructor(
    @InjectRepository(Gorseller)
    private readonly gorsellerRepository: Repository<Gorseller>,
  ) {}
  async uploadFile(file: any): Promise<string> {
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

    const fileReference = bucket.file(`${fileUpload.name}`); // create reference to file.
    await fileReference.makePublic(); // make a public file.
    const url = fileUpload.publicUrl(); // // Get a public URL for the file.

    return url;
  }
  async uploadMultipleFiles(files: any[]): Promise<string[]> {
    const urls: string[] = [];
    await Promise.all(
      files?.map(async (file) => {
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
        const url = await fileUpload.publicUrl();
        urls.push(url);
      }),
    );

    return urls;
  }
  async addImagetoDB(isletmeid: string, files: any[]): Promise<string[]> {
    const urls: string[] = [];
    await Promise.all(
      files?.map(async (file) => {
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
        const url = await fileUpload.publicUrl();
        urls.push(url);
        const data = {
          isletmeid: isletmeid,
          photoName: 'Görsel Adı',
          description: 'Görsel Açıklaması',
          url: url,
        };
        const newRecord = this.gorsellerRepository.create(data);
        await this.gorsellerRepository.save(newRecord);
      }),
    );

    return urls;
  }
}
